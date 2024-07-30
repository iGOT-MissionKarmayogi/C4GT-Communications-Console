import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})


export class SendEmailComponent implements OnInit {
  templates: any[] = [];
  selectedTemplate: any = null;
  showSuccessMessage : Boolean | undefined; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTemplates();
  }
  @ViewChild('previewSection') previewSection!: ElementRef;

  fetchTemplates() {
    this.http.get('http://localhost:5000/api/email/templates')
      .subscribe({
        next: (response: any) => {
          this.templates = response;
        },
        error: (error) => {
          console.error('Error fetching templates:', error);
        }
      });
  }

  selectTemplate(template: any) {
    this.selectedTemplate = template;
  }

  previewTemplate(template: any, event: Event) {
    event.stopPropagation(); // Prevent the outer click event
    this.selectTemplate(template);
    setTimeout(() => {
      this.previewSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  sendEmail() {
    const emailData = {
      to: 'aakarshsolar@gmail.com',
      templateId: this.selectedTemplate._id // Assuming the template has an _id field
    };

    this.http.post('http://localhost:5000/api/email/send-email', emailData)
      .subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          this.showSuccessMessage = true; 
          // Optionally, provide feedback to the user
        },
        error: (error) => {
          console.error('Error sending email:', error);
          // Optionally, handle error feedback to the user
        }
      });
  }
}


