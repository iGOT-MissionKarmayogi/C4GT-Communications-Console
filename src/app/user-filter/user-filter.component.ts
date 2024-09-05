import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dateRangeValidator, noNumbersValidator } from '../utils/validations';

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
    private router: Router,
    private toastr: ToastrService
  ) {
    this.userFilterForm = this.fb.group(
      {
        courseId: [''],
        batchId: [''],
        userId: [''],
        location: ['', [Validators.required, noNumbersValidator()]],
        totalLeafNodecount: [''],
        progressType: ['single'],
        progress: ['', [Validators.min(0), Validators.max(100)]],
        progressRangeStart: ['', [Validators.min(0), Validators.max(100)]],
        progressRangeEnd: ['', [Validators.min(0), Validators.max(100)]],
        dateType: ['single'],
        batchEnrollmentDate: [''],
        batchEnrollmentDateStart: [''],
        batchEnrollmentDateEnd: [''],
        lastAccessTime: [''],
        lastCompletedTime: [''],
        lastUpdatedTime: [''],
        limit: ['', [Validators.min(0)]],
        sortByField: [''],
        sortByOrder: ['asc'],
      },
      { validators: dateRangeValidator() }
    );

    const savedFormData = this.userService.getSavedFormData();
    if (savedFormData) {
      console.log('Patching form with saved data:', savedFormData);
      this.userFilterForm.patchValue(savedFormData);
    }

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

    if (formValues.limit && formValues.limit < 0) {
      this.toastr.error('Limit value must not be negative');
      return;
    }

    if (
      (formValues.progress &&
        (formValues.progress < 0 || formValues.progress > 100)) ||
      (formValues.progressRangeStart &&
        (formValues.progressRangeStart < 0 ||
          formValues.progressRangeStart > 100)) ||
      (formValues.progressRangeEnd &&
        (formValues.progressRangeEnd < 0 || formValues.progressRangeEnd > 100))
    ) {
      this.toastr.error('Progress values must be between 0 and 100');
      return;
    }

    if (this.userFilterForm) {
      this.userService.saveFormData(this.userFilterForm.value);
      const filters: { [key: string]: any } = Object.keys(
        this.userFilterForm.value
      )
        .filter(
          (key) =>
            this.userFilterForm.value[key] !== '' &&
            this.userFilterForm.value[key] !== undefined
        )
        .reduce((obj, key) => {
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
            key === 'progress' ||
            key === 'progressRangeStart' ||
            key === 'progressRangeEnd'
          ) {
            if (key === 'progress') {
              obj[key] = this.userFilterForm.value[key];
            } else if (
              key === 'progressRangeStart' ||
              key === 'progressRangeEnd'
            ) {
              const progressRangeStart =
                this.userFilterForm.value['progressRangeStart'];
              const progressRangeEnd =
                this.userFilterForm.value['progressRangeEnd'];

              if (
                progressRangeStart !== undefined &&
                progressRangeEnd !== undefined
              ) {
                obj['progress'] = {
                  min: progressRangeStart,
                  max: progressRangeEnd,
                };
              }
            }
          } else if (
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

      this.userService.searchUsers(requestBody).subscribe(
        (response) => {
          this.apiResponse = response;
          this.errorMessage = null;
          this.userService.setResponseData(this.apiResponse);
          this.router.navigate(['/records']);
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 404) {
            this.errorMessage = 'No users found matching the search criteria.';
            this.userService.setErrorMessage(this.errorMessage);
          } else {
            this.errorMessage = 'Failed to fetch data. Please try again later.';
          }
          this.router.navigate(['/records']);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onReset(): void {
    this.userFilterForm.reset({
      progressType: 'single',
      dateType: 'single',
      sortByOrder: 'asc',
    });
    this.selectedFields = [];
    this.allFieldsSelected = false;
    this.onProgressTypeChange('single');
    this.onDateTypeChange('single');
  }
}
