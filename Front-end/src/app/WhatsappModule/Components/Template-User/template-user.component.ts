import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WhatsappTemplateService } from '../../Services/whatsapp-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-template-user',
  templateUrl: './template-user.component.html',
  styleUrls: ['./template-user.component.css'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class WhatsappTemplateUserComponent implements OnInit {
  templateData: any;
  loading: boolean = true;
  previewText: string = '';
  fields: string[] = [];
  recipientNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private whatsappService: WhatsappTemplateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const templateId = this.route.snapshot.paramMap.get('templateId');
    if (templateId) {
      this.getTemplate(templateId);
    } else {
      this.router.navigate(['/']); // Redirect if templateId is missing
    }
  }

  getTemplate(templateId: string): void {
    this.whatsappService.getSingleTemplate(templateId).subscribe(
      template => {
        this.templateData = template;
        this.loading = false;
        this.initializeFields();
        this.updatePreview();
      },
      error => {
        console.error('Error fetching template:', error);
        this.loading = false;
      }
    );
  }

  initializeFields(): void {
    const fieldCount = (this.templateData?.structure.body.text.match(/{{\d+}}/g) || []).length;
    this.fields = Array(fieldCount).fill('');
  }

  updatePreview() {
    if (!this.templateData?.structure.body.text) {
      return;
    }

    let updatedText = this.templateData.structure.body.text;

    this.fields.forEach((field, index) => {
      const placeholder = `{{${index + 1}}}`;
      updatedText = updatedText.replace(placeholder, field || placeholder);
    });

    this.previewText = updatedText;
  }

  sendMessage(): void {
    const messageBody = {
      from: "919027527049",
      to: this.recipientNumber,
      messageId: "a28dd97c-1ffb-4fcf-99f1-0b557ed381da",
      templateName: this.templateData.name,
      placeholders: this.fields,
      language: "en",
      callbackData: "Callback data",
      notifyUrl: "https://www.example.com/whatsapp"
    };

    this.whatsappService.sendMessage(messageBody).subscribe(
      messageResponse => {
        console.log("Message response:", messageResponse);
        alert("The message sent successfully.");
      },
      error => {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    );
  }
}
