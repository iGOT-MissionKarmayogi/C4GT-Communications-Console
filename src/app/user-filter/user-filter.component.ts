import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service.service';
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
  isSingleValue: boolean = true;
  isSingleDate: boolean = true;
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
      progressType: ['single'],
      progress: [''],
      progressRangeStart: [''],
      progressRangeEnd: [''],
      dateType: ['single'],
      batchEnrollmentDate: [''],
      batchEnrollmentDateStart: [''],
      batchEnrollmentDateEnd: [''],
      lastAccessTime: [''],
      lastCompletedTime: [''],
      lastUpdatedTime: [''],
      limit: [''],
      sortByField: [''],
      sortByOrder: ['asc'],
    });

    this.onProgressTypeChange('single');
    this.onDateTypeChange('single');
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

  onProgressTypeChange(type: string): void {
    this.isSingleValue = type === 'single';
    this.userFilterForm.patchValue({
      progress: '',
      progressRangeStart: '',
      progressRangeEnd: '',
    });
  }

  onDateTypeChange(type: string): void {
    this.isSingleDate = type === 'single';
    this.userFilterForm.patchValue({
      batchEnrollmentDate: '',
      batchEnrollmentDateStart: '',
      batchEnrollmentDateEnd: '',
    });
  }

  onSubmit(): void {
    const formValues = this.userFilterForm.value;
    console.log(formValues, 'formvalues');

    if (this.userFilterForm) {
      const filters: { [key: string]: any } = Object.keys(
        this.userFilterForm.value
      )
        .filter(
          (key) =>
            this.userFilterForm.value[key] !== '' &&
            this.userFilterForm.value[key] !== undefined
        )
        .reduce((obj, key) => {
          console.log(formValues[key], ' ');
          console.log(this.userFilterForm.value[key], ' ');

          if (key === 'batchEnrollmentDate' && this.userFilterForm.value[key]) {
            obj[key] = this.userFilterForm.value[key];
          } else if (key === 'dateType') {
            if (this.isSingleDate) {
              if (this.userFilterForm.value['batchEnrollmentDate']) {
                obj['batchEnrollmentDate'] =
                  this.userFilterForm.value['batchEnrollmentDate'];
              }
            } else {
              if (
                this.userFilterForm.value['batchEnrollmentDateStart'] &&
                this.userFilterForm.value['batchEnrollmentDateEnd']
              ) {
                obj['batchEnrollmentDate'] = {
                  min: this.userFilterForm.value['batchEnrollmentDateStart'],
                  max: this.userFilterForm.value['batchEnrollmentDateEnd'],
                };
              }
            }
          } else if (
            key !== 'progress' &&
            key !== 'progressRangeStart' &&
            key !== 'progressRangeEnd' &&
            key !== 'batchEnrollmentDateStart' &&
            key !== 'batchEnrollmentDateEnd' &&
            key != 'progressType' &&
            key != 'limit' &&
            key != 'sortByField' &&
            key != 'sortByOrder'
          ) {
            obj[key] = this.userFilterForm.value[key];
          }
          return obj;
        }, {} as { [key: string]: any });

      console.log(filters, 'filters');
      console.log(this.selectedFields, 'this.selectedFields');

      const limit = formValues.limit
        ? parseInt(formValues.limit, 10)
        : undefined;
      const sortByField = formValues.sortByField;
      const sortByOrder = formValues.sortByOrder;

      const sortBy = sortByField ? { [sortByField]: sortByOrder } : undefined;

      const requestBody = {
        request: {
          search: {
            filter: filters,
            fields: this.selectedFields,
            limit: limit,
            sort_by: sortBy,
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
          this.router.navigate(['/records']);
        },
        (error) => {
          this.errorMessage = 'Failed to fetch data. Please try again later.';
          console.error('Error:', error);
          this.router.navigate(['/records']);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
