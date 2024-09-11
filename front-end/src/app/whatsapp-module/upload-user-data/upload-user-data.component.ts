import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

interface User {
  name: string;
  whatsappNumber: string;
  checked: boolean;
}

@Component({
  selector: 'app-upload-WhatsApp-user-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, AgGridModule],
  providers: [MessageService],
  templateUrl: './upload-user-data.component.html',
  styleUrls: ['./upload-user-data.component.css'],
})
export class UploadWhatsappUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
  uploadSuccess: any;
  uploadError: any;
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUsers: User[] = [];  // To store selected users
  newUser: User = { name: '', whatsappNumber: '', checked: false };
  searchQuery = '';
  sortAscending = true;
  showAddForm = false;
  showFilePopup = false;
  gridApi!: GridApi;

  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', checkboxSelection: true },
    { field: 'whatsappNumber', headerName: 'WhatsApp Number' },
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      checkboxSelection: true,
      filter: true,
    },
    rowSelection: 'multiple',
  };

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private papa: Papa,
    private messageService: MessageService
  ) { }

  // Add user manually
  addUser() {
    if (this.newUser.name && this.newUser.whatsappNumber) {
      this.users.push({ ...this.newUser, checked: false });
      this.newUser = { name: '', whatsappNumber: '', checked: false };
      this.showAddForm = false;
      this.filterUsers();
    }
  }

  // When file is selected, process CSV
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.papa.parse(file, {
        complete: (result) => {
          this.processCSV(result.data);
        },
        header: true,
      });
      this.showFilePopup = false;
      input.value = '';  // Clear file input value
    }
  }

  // Process CSV and add valid rows to the users array
  processCSV(data: any[]) {
    const newUsers = data
      .map((row: any) => ({
        name: row['Name'] || row['name'],
        whatsappNumber: row['Phone Number'] || row['whatsappNumber'] || row['phone'],
        checked: false,
      }))
      .filter((user: User) => user.name && user.whatsappNumber);

    this.users = [...this.users, ...newUsers];
    this.filterUsers();
  }

  // Submit selected users to server
  Submit() {
    if (this.selectedUsers.length === 0) {
      console.error('No users selected');
      alert('Please select at least one user to upload.');
      return;
    }

    this.http
      .post('http://localhost:5000/api/whatsapp/users', this.selectedUsers, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          console.log('Users uploaded successfully:', response);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Users uploaded successfully!',
          });
          this.selectedUsers = []; // Clear selected users
          this.uploadSuccess = true;
          this.fileContent = '';  // Clear file content after upload
          this.resetSelection();
        },
        error: (error) => {
          console.error('Error uploading users:', error);
          this.uploadError = true;
        },
      });
  }

  // Search and filter users based on search query
  filterUsers() {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.whatsappNumber.includes(this.searchQuery)
    );
    this.sortUsers();
    this.updateGrid(); // Use applyTransaction to update grid
  }

  // Sort users based on name
  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortAscending ? comparison : -comparison;
    });
  }

  // Toggle sorting order
  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortUsers();
    this.updateGrid(); // Update grid after sorting
  }

  // Update the AG Grid using applyTransaction
  updateGrid() {
    if (this.gridApi) {
      this.gridApi.applyTransaction({ update: this.filteredUsers });
    }
  }

  // Reset selection of users
  resetSelection() {
    this.users.forEach((user) => (user.checked = false));
    this.filterUsers(); // Refresh the filtered list if needed
  }

  // AG Grid API ready
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.applyTransaction({ add: this.filteredUsers }); // Initialize the grid with filtered data
  }

  // Event when selection changes
  onSelectionChanged() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedUsers = selectedNodes.map((node) => node.data); // Update selectedUsers array
    console.log('Selected Users:', this.selectedUsers);
  }

  // Trigger file input for CSV import
  importFromCSV() {
    this.fileInput?.nativeElement.click();
  }
}
