import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Papa } from 'ngx-papaparse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './upload-user-data.component.html',
  styleUrls: ['./upload-user-data.component.css']
})
export class UploadUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
  uploadSuccess: any;
  uploadError: any;
  users: { name: string, phoneNo: string, checked: boolean }[] = [];
  filteredUsers: { name: string, phoneNo: string, checked: boolean }[] = [];
  newUser: { name: string, phoneNo: string } = { name: '', phoneNo: '' };
  showAddForm = false;
  showFilePopup = false;
  searchQuery = '';
  sortAscending = true;

  constructor(private http: HttpClient, private papa: Papa) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result;
    };
    reader.readAsText(file);
  }

  onSubmit() {
    if (this.fileContent) {
      try {
        const users = JSON.parse(this.fileContent.toString());
        this.http.post('http://localhost:5001/upload-users', users).subscribe({
          next: (response) => {
            console.log('Users uploaded successfully:', response);
            this.uploadSuccess = true;
            this.filterUsers();
          },
          error: (error) => {
            console.error('Error uploading users:', error);
            this.uploadError = true;
          }
        });
      } catch (error) {
        console.error('Invalid JSON format:', error);
      }
    }
  }

  addUser() {
    if (this.newUser.name && this.newUser.phoneNo) {
      this.users.push({ ...this.newUser, checked: false });
      this.newUser = { name: '', phoneNo: '' };
      this.showAddForm = false;
      this.filterUsers();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.papa.parse(file, {
        complete: (result) => {
          this.processCSV(result.data);
        },
        header: true
      });
    }
    this.showFilePopup = false;
  }

  processCSV(data: any[]) {
    const newUsers = data.map(row => ({
      name: row['Name'] || row['name'],
      phoneNo: row['Phone Number'] || row['phoneNo'] || row['phone'],
      checked: false
    })).filter(user => user.name && user.phoneNo);
    
    this.users = [...this.users, ...newUsers];
    this.filterUsers();
  }

  importFromCSV() {
    document.getElementById('fileInput')?.click();
  }

  sendSMS() {
    const selectedUsers = this.users.filter(user => user.checked);
    console.log('Sending SMS to:', selectedUsers);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phoneNo.includes(this.searchQuery)
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

  toggleUserSelection(user: any) {
    user.checked = !user.checked;
  }
}
