import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Papa } from 'ngx-papaparse';
import { FormsModule } from '@angular/forms';
import { TemplatePopupComponent } from '../template-popup/template-popup.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,TemplatePopupComponent,ToastModule],
  providers: [MessageService], 
  templateUrl: './upload-user-data.component.html',
  styleUrls: ['./upload-user-data.component.css']
})
export class UploadUserDataComponent {
  fileContent: string | ArrayBuffer | null = '';
  uploadSuccess: any;
  uploadError: any;
  users: { name: string, phoneNumber: string, checked: boolean }[] = [];
  filteredUsers: { name: string, phoneNumber: string, checked: boolean }[] = [];
  newUser: { name: string, phoneNumber: string } = { name: '', phoneNumber: '' };
  showAddForm = false;
  showFilePopup = false;
  searchQuery = '';
  sortAscending = true;
  showTemplatePopup = false;
  selectedTemplate: any = null;
  selectedUsers: any[] = [];

  constructor(private http: HttpClient, private papa: Papa,private messageService: MessageService) {}

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
        this.http.post('http://localhost:5000/upload-users', users).subscribe({
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


  // Method to upload users to the backend
  uploadUsers() {
    const data = this.users;
    console.log(data)
    if (this.users.length > 0) {
      this.http.post('http://localhost:5000/api/user/add-users', data).subscribe({
        next: (response) => {
          console.log('Users uploaded successfully:', response);
          this.uploadSuccess = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Users uploaded successfully' });
          this.filterUsers();
        },
        error: (error) => {
          console.error('Error uploading users:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading users' });
          this.uploadError = true;
        }
      });
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No users to upload' });
    }
  }

  // Method to fetch users from the backend
  fetchUsers() {
    this.http.get<{ name: string, phoneNumber: string, checked: boolean }[]>('http://localhost:5000/api/user/get-users').subscribe({
      next: (response:any) => {
        console.log('Fetched users:', response);
        this.users = [...this.users,...response.data]
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Users fetched successfully' });
        this.filterUsers();
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching users' });
      }
    });
  }


  addUser() {
    if (this.newUser.name && this.newUser.phoneNumber) {
      this.users.push({ ...this.newUser, checked: false });
      this.newUser = { name: '', phoneNumber: '' };
      this.showAddForm = false;
      this.filterUsers();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
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
      phoneNumber: row['Phone Number'] || row['phoneNo'] || row['phone'],
      checked: false
    })).filter(user => user.name && user.phoneNumber);
    
    this.users = [...this.users, ...newUsers];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Users added successfully' });
    console.log(this.users)
    this.filterUsers();
  }

  importFromCSV() {
    document.getElementById('fileInput')?.click();
  }

  sendSMS() {
    const selectedUsers = this.users.filter(user => user.checked);
    this.selectedUsers = selectedUsers;
    if(selectedUsers.length > 0){
      this.showTemplatePopup = true;
      console.log('Sending SMS to:', selectedUsers);
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No users selected' });
    }
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(this.searchQuery)
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
  handleTemplateSelection(template: any) {
    this.selectedTemplate = template;
    this.showTemplatePopup = false;
  }

  closeFullScreenTemplate() {
    this.selectedTemplate = null;
  }
}
