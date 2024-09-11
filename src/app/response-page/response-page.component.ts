import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response-page',
  standalone: true,
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css'],
  imports: [CommonModule],
})
export class ResponsePageComponent implements OnInit {
  responseData: any;
  errorMessage: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.responseData = this.userService.getResponseData();
    this.errorMessage = this.userService.getErrorMessage();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goBack(): void {
    this.responseData = this.userService.setResponseData(null);
    this.errorMessage = this.userService.setErrorMessage(null);
    this.router.navigate(['/'], {});
  }
}
