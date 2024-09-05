import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserSelectionService } from '../view-user-data/user-selection.service';


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
  selectedUsers: any[] = [];

  constructor(private http: HttpClient, private userSelectionService: UserSelectionService) {
    this.selectedUsers = this.userSelectionService.selectedUsers;
  }

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
    this.selectedUsers = this.userSelectionService.getSelectedUsers();
  }

  previewTemplate(template: any, event: Event) {
    event.stopPropagation(); // Prevent the outer click event
    this.selectTemplate(template);
    setTimeout(() => {
      this.previewSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  sendEmail() {
    
    let successfulSends = 0;

    this.selectedUsers.forEach(user => {
      this.http.get(`http://localhost:5000/api/email/templates/${this.selectedTemplate._id}`)
      .subscribe({
        next: (templateResponse: any) => {
          // Replace [User] with user.name in the email body
          const emailBody = templateResponse.body.replace('[User]', user.name);
          console.log(emailBody);


        const emailData = {
          to: user.email,
          body:emailBody,
          templateId: this.selectedTemplate._id // Assuming the template has an _id field
        };

    this.http.post('http://localhost:5000/api/email/send-email', emailData)
      .subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          successfulSends++;
          this.showSuccessMessage = true; 
          if (successfulSends === this.selectedUsers.length) {
            alert(`Emails sent successfully to ${successfulSends} users.`);
          }
        },
        error: (error) => {
          console.error('Error sending email:', error);
          // Optionally, handle error feedback to the user
        }
      });
  },
  error: (error) => {
    console.error('Error fetching template content:', error);
  }
});
});
}
}


