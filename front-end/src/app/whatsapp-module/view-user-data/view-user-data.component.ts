import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigatorService } from '../Services/navigator.service';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { Papa } from 'ngx-papaparse';
import { ToastModule } from 'primeng/toast';

interface User {
  name: string;
  whatsappNumber: string;
  checked: boolean;
}

@Component({
  selector: 'app-view-WhatsApp-user-data',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule,ToastModule],
  templateUrl: './view-user-data.component.html',
  styleUrls: ['./view-user-data.component.css'],
})
export class ViewWhatsAppUserDataComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  newUser: { name: string; whatsappNumber: string } = { name: '', whatsappNumber: '' };
  searchQuery = '';
  showAddForm = false;
  gridApi!: GridApi;
  
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', checkboxSelection: true },
    { field: 'whatsappNumber', headerName: 'WhatsApp Number' }
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      checkboxSelection: true,
      filter: true
    },
    rowSelection: 'multiple'
  };

  constructor(
    private http: HttpClient,
    private NavigatorService: NavigatorService
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<User[]>('http://localhost:5000/api/whatsapp/users', { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.users = data;
          this.filterUsers();
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.whatsappNumber.includes(this.searchQuery)
    );
    this.updateGrid(); // Use transactions to update the grid
  }

  addUser() {
    if (this.newUser.name && this.newUser.whatsappNumber) {
      const newUser: User = { ...this.newUser, checked: false };
      this.users.push(newUser);
      this.newUser = { name: '', whatsappNumber: '' };
      this.showAddForm = false;
      this.filterUsers(); // Refresh grid with the newly added user
    }
  }

  Submit() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedUsers = selectedNodes.map(node => node.data);

    if (selectedUsers.length === 0) {
      console.error('No users selected');
      alert('Please select at least one user.');
      return;
    }

    this.NavigatorService.setSelectedUsers(selectedUsers);
    console.log("Selected Users:", this.NavigatorService.getSelectedUsers());
    alert("Recipients added to list!");
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.updateGrid(); // Initialize the grid with filtered data
  }

  onSelectionChanged() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    console.log('Selected Users:', selectedNodes.map(node => node.data));
  }

  updateGrid() {
    if (this.gridApi) {
      // Use applyTransaction for updating grid
      const transactions = {
        add: this.filteredUsers, // Add or update rows as necessary
      };
      this.gridApi.applyTransaction(transactions);
    }
  }
}
