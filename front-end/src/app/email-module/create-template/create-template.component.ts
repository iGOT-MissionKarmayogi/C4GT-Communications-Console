import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-template',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule],
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent {
  name: string = '';
  subject: string = '';
  body: string = '';
  showSuccessMessage: boolean | undefined;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  

  constructor(private http: HttpClient) { }

  onSubmit() {

    if (!this.name || !this.subject || !this.body) {
      this.showErrorMessage = true;
      this.errorMessage = 'All fields are required.';
      return;
    }

    const templateData = {
      name: this.name,
      subject: this.subject,
      body: this.body
    };

    this.http.post('http://localhost:5000/api/email/templates', templateData)
      .subscribe({
        next: (response) => {
          console.log('Template created successfully:', response);
          this.showSuccessMessage = true;

          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating template:', error);
          this.showErrorMessage = true;
          this.errorMessage = 'Failed to create template. Please try again.';
        }
      });
  }

  resetForm() {
    this.name = '';
    this.subject = '';
    this.body = '';


  }

}
