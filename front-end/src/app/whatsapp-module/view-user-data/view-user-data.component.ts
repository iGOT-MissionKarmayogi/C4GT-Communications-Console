import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Papa } from 'ngx-papaparse';
import { FormsModule } from '@angular/forms';
import { NavigatorService } from '../Services/navigator.service';
interface User {
  name: string;
  whatsappNumber: string;
  checked: boolean;
}

@Component({
  selector: 'app-view-WhatsApp-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './view-user-data.component.html',
  styleUrls: ['./view-user-data.component.css']
})

export class ViewWhatsAppUserDataComponent implements OnInit {
  fields: string[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  newUser: { name: string; whatsappNumber: string } = { name: '', whatsappNumber: '' };
  searchQuery = '';
  sortAscending = true;

  constructor(private http: HttpClient, private papa: Papa, private NavigatorService:NavigatorService) {}
  
  
  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<User[]>('http://localhost:5000/api/whatsapp/users', { withCredentials: true })
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.fields = Object.keys(data[0]);
          }
          this.users = data;
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

  

  Submit() {
    const selectedUsers = this.users.filter(user => user.checked);
    
    if (selectedUsers.length === 0) {
      console.error('No users selected');
      return;
    }
    console.log(selectedUsers);
    this.NavigatorService.setSelectedUsers(selectedUsers);
    console.log("We will send message to these:",this.NavigatorService.getSelectedUsers());
    alert("Recipients added to list!")
  }

  
}
