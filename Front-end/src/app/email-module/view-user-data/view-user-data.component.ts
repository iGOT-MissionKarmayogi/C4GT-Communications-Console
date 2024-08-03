import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSelectionService } from './user-selection.service'; 

@Component({
  selector: 'app-view-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './view-user-data.component.html',
  styleUrl: './view-user-data.component.css'
})



export class ViewUserDataComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  fields: string[] = [];
  selectedUsers: Set<number> = new Set<number>();
  filters: any = {};
  uniqueValues: any = {};
  selectedRows: any[] = [];
  selectionMessage: string = '';

  constructor(private http: HttpClient, private userSelectionService: UserSelectionService) { }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<any[]>('http://localhost:5000/api/email/users')
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            this.fields = Object.keys(data[0]);
            this.fields.forEach(field => {
              this.filters[field] = '';
              this.uniqueValues[field] = Array.from(new Set(data.map(user => user[field])));
            });
          }
          this.users = data.map(user => ({ ...user, selected: false }));
          this.filteredUsers = [...this.users];
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      });
  }

  toggleSelection(userId: number) {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
    this.updateUserSelection(userId);
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.filteredUsers.forEach(user => {
      user.selected = isChecked;
      if (isChecked) {
        this.selectedUsers.add(user.id);
      } else {
        this.selectedUsers.delete(user.id);
      }
    });
  }

  applyFilters() {
      this.filteredUsers = this.users.filter(user => {
          return Object.keys(this.filters).every(key => {
              if ((key === 'age' || key === 'id') && this.filters[key] !== '') {
                  return user[key] === +this.filters[key]; // Convert filter value to number
              }
              return this.filters[key] === '' || user[key] === this.filters[key];
          });
      });
  }

  selectUsers() {
    this.selectedRows = this.filteredUsers.filter(user => user.selected);
    this.userSelectionService.setSelectedUsers(this.selectedRows);
    this.selectionMessage = `Users selected successfully. Go to Send Email for further steps. Number of users selected: ${this.userSelectionService.getSelectedUsers().length}`;
    console.log(this.userSelectionService.getSelectedUsers());
  }

  private updateUserSelection(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.selected = this.selectedUsers.has(userId);
    }
  }
}



