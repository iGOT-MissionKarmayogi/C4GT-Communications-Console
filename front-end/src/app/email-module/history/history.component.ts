import { Component, OnInit } from '@angular/core';
import { EmailHistoryService } from '../services/email-history.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ RouterModule,CommonModule, FormsModule ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit {
  emailHistory: any[] = [];
  filterStatus: string = '';

  constructor(
    private emailHistoryService: EmailHistoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchEmailHistory();
  }

  fetchEmailHistory(): void {
    this.emailHistoryService.getEmailHistory().subscribe((data: any[]) => {
      this.emailHistory = data.reverse();
    });
  }

  filteredHistory(): any[] {
    if (!this.filterStatus) {
      return this.emailHistory;
    }
    return this.emailHistory.filter(history => history.status === this.filterStatus);
  }

  resendEmail(history: any): void {
    const message = `Go to the "View User Data" menu and repeat the process for user`;
    window.alert(message);
    // Navigate to the "View User Data" menu
  }
}
