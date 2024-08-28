import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class UserFilterComponent {
  userFilterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userFilterForm = this.fb.group({
      _id: [''],
      courseId: [''],
      batchId: [''],
      userId: [''],
      location: [''],
      totalLeafNodecount: [''],
      completedContents: this.fb.array([this.createCompletedContent()]),
      progress: [''],
      batchEnrollmentDate: [''],
      lastAccessTime: [''],
      lastCompletedTime: [''],
      lastUpdatedTime: [''],
      viewCount: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  createCompletedContent(): FormGroup {
    return this.fb.group({
      identifier: [''],
      status: [''],
    });
  }

  get completedContents(): FormArray {
    return this.userFilterForm.get('completedContents') as FormArray;
  }

  addCompletedContent() {
    this.completedContents.push(this.createCompletedContent());
  }

  removeCompletedContent(index: number) {
    this.completedContents.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.userFilterForm.value);
  }
}
