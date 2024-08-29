import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service'; // Adjust the path accordingly
import { CommonModule } from '@angular/common';

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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.responseData = this.userService.getResponseData();
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
