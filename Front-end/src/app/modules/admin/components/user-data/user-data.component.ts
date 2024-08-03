import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  users: { name: string, phoneNo: string }[] = [];
  newUser: { name: string, phoneNo: string } = { name: '', phoneNo: '' };
  showAddForm = false;
  showFilePopup = false;
  constructor(private papa: Papa) {}

  addUser() {
    if (this.newUser.name && this.newUser.phoneNo) {
      this.users.push({ ...this.newUser });
      this.newUser = { name: '', phoneNo: '' };
      this.showAddForm = false;
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
      phoneNo: row['Phone Number'] || row['phoneNo'] || row['phone']
    })).filter(user => user.name && user.phoneNo);
    
    this.users = [...this.users, ...newUsers];
  }

  importFromCSV() {
    // Trigger file input click
    document.getElementById('fileInput')?.click();
  }

  sendSMS() {
    // Implement logic to send SMS
    console.log('Sending SMS to:', this.users);
  }
}
