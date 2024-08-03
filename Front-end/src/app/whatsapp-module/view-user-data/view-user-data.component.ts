import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-view-WhatsApp-user-data',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './view-user-data.component.html',
  styleUrl: './view-user-data.component.css'
})

export class ViewWhatsAppUserDataComponent implements OnInit {
  users: any[] = [];
  fields: string[] = [];
  selectedUsers: Set<number> = new Set<number>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<any[]>('http://localhost:5001/users')
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

  toggleSelection(userId: number) {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
  }
}
