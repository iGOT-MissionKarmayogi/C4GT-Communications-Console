import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class UserFilterComponent {
  userFilterForm: FormGroup;
  responseFields: string[] = [
    'userId',
    'courseId',
    'location',
    'progress',
    'batchId',
    'totalLeafNodecount',
    'completedContents',
    'batchEnrollmentDate',
    'lastAccessTime',
    'lastCompletedTime',
    'lastUpdatedTime',
    'viewCount',
  ];
  selectedFields: string[] = [];
  allFieldsSelected: boolean = false;
  apiResponse: any;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userFilterForm = this.fb.group({
      courseId: [''],
      batchId: [''],
      userId: [''],
      location: [''],
      totalLeafNodecount: [''],
      progress: [''],
      batchEnrollmentDate: [''],
      lastAccessTime: [''],
      lastCompletedTime: [''],
      lastUpdatedTime: [''],
    });
  }

  toggleSelectAll(event: any) {
    this.allFieldsSelected = event.target.checked;
    this.selectedFields = this.allFieldsSelected
      ? [...this.responseFields]
      : [];
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  onFieldChange(event: any) {
    const field = event.target.value;
    if (event.target.checked) {
      this.selectedFields.push(field);
    } else {
      this.selectedFields = this.selectedFields.filter((f) => f !== field);
    }
    this.allFieldsSelected =
      this.selectedFields.length === this.responseFields.length;
  }

  onSubmit(): void {
    if (this.userFilterForm) {
      const filters: { [key: string]: any } = Object.keys(
        this.userFilterForm.value
      )
        .filter((key) => this.userFilterForm.value[key])
        .reduce((obj, key) => {
          obj[key] = this.userFilterForm.value[key];
          return obj;
        }, {} as { [key: string]: any });

      const requestBody = {
        request: {
          search: {
            filter: filters,
            fields: this.selectedFields,
          },
        },
      };

      console.log('Request Body:', requestBody);

      this.userService.searchUsers(requestBody).subscribe(
        (response) => {
          console.log(response, 'response');

          this.apiResponse = response;
          this.errorMessage = null;
          console.log('API Response:', response);
          this.userService.setResponseData(this.apiResponse);
          this.router.navigate(['/users']);
        },
        (error) => {
          this.errorMessage = 'Failed to fetch data. Please try again later.';
          console.error('Error:', error);
          this.router.navigate(['/users']);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
