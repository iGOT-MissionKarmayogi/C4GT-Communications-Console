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
  selectedFile: File | null = null;

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

  onFileSelected(event: any) { 
    this.selectedFile = event.target.files[0];
  }

  sendEmail() {
    
    let successfulSends = 0;
    

    this.selectedUsers.forEach(user => {
      this.http.get(`http://localhost:5000/api/email/templates/${this.selectedTemplate._id}`)
      .subscribe({
        next: (templateResponse: any) => {
          // Replace {{Name}} with user.name in the email body and so on
          const variables = {
            Name: user.name,
            Email: user.email,
            Age: user.age,
            Mobile: user.mobile_no,
            Address: user.address,
            Occupation: user.occupation,
            Company: user.company
            // Add more variables as needed
          };
          
          const replaceVariables = (template: string, variables: { [key: string]: string }) => {
            return template.replace(/{{([^}]+)}}/g, (match, p1) => variables[p1.trim()] || match);
          };
          const emailBody = replaceVariables(templateResponse.body, variables);
          


          const formData = new FormData();
          formData.append('to', user.email);
          formData.append('username', user.name);
          formData.append('body', emailBody);
          formData.append('templateId', this.selectedTemplate._id);

          if (this.selectedFile) {
            formData.append('attachment', this.selectedFile, this.selectedFile.name);
          }

    this.http.post('http://localhost:5000/api/email/send-email', formData)
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


