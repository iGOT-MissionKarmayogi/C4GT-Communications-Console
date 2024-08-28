import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
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

  onFieldChange(event: any) {
    const field = event.target.value;
    if (event.target.checked) {
      this.selectedFields.push(field);
    } else {
      this.selectedFields = this.selectedFields.filter((f) => f !== field);
    }
  }

  onSubmit(): void {
    console.log(this.userFilterForm);

    if (this.userFilterForm) {
      const filters = this.userFilterForm.value;
      const requestBody = {
        request: {
          search: {
            filter: filters,
            fields: this.selectedFields,
          },
        },
      };
      console.log(this.userFilterForm.value);
      this.userService.searchUsers(requestBody).subscribe(
        (response) => {
          console.log('API Response:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
