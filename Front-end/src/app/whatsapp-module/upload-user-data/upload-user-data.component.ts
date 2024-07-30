import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Papa } from 'ngx-papaparse';

interface User {
  name: string;
  whatsappNumber: string;
  checked: boolean;
}

@Component({
  selector: 'app-upload-WhatsApp-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './upload-user-data.component.html',
  styleUrls: ['./upload-user-data.component.css']
})
export class UploadWhatsappUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
  uploadSuccess: any;
  uploadError: any;
  users: User[] = [];
  filteredUsers: User[] = [];
  newUser: { name: string; whatsappNumber: string } = { name: '', whatsappNumber: '' };
  showAddForm = false;
  showFilePopup = false;
  searchQuery = '';
  sortAscending = true;

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient, private papa: Papa) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.readAsText(file);
    }
  }

  Submit() {
    const selectedUsers = this.users.filter(user => user.checked);
    
    if (selectedUsers.length === 0) {
      console.error('No users selected');
      return;
    }

    this.http.post('http://localhost:5000/api/whatsapp/users', selectedUsers, { 
      withCredentials: true 
    }).subscribe({
      next: (response) => {
        console.log('Users uploaded successfully:', response);
        alert("Data Uploaded successfully!");
        this.users=[];
        this.uploadSuccess = true;
        this.fileContent = '';  // Clear file content after upload
        this.resetSelection();
      },
      error: (error) => {
        console.error('Error uploading users:', error);
        this.uploadError = true;
      }
    });
  }

  addUser() {
    if (this.newUser.name && this.newUser.whatsappNumber) {
      this.users.push({ ...this.newUser, checked: false });
      this.newUser = { name: '', whatsappNumber: '' };
      this.showAddForm = false;
      this.filterUsers();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.papa.parse(file, {
        complete: (result) => {
          this.processCSV(result.data);
        },
        header: true
      });
      this.showFilePopup = false;
      input.value = '';  // Clear file input value
    }
  }

  processCSV(data: any[]) {
    const newUsers = data.map((row: any) => ({
      name: row['Name'] || row['name'],
      whatsappNumber: row['Phone Number'] || row['whatsappNumber'] || row['phone'],
      checked: false
    })).filter((user: User) => user.name && user.whatsappNumber);
    
    this.users = [...this.users, ...newUsers];
    this.filterUsers();
  }

  importFromCSV() {
    this.fileInput?.nativeElement.click();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.whatsappNumber.includes(this.searchQuery)
    );

    this.sortUsers();
  }

  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return this.sortAscending ? comparison : -comparison;
    });
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.sortUsers();
  }

  toggleUserSelection(user: User) {
    user.checked = !user.checked;
  }

  resetSelection() {
    this.users.forEach(user => user.checked = false);
    this.filterUsers();  // Refresh the filtered list if needed
  }
}
