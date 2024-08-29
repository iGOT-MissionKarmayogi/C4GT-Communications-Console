import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class UserFilterComponent {
  userFilterForm: FormGroup;
  selectedFields: string[] = [];
  apiResponse: any;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
        },
        (error) => {
          this.errorMessage = 'Failed to fetch data. Please try again later.';
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
