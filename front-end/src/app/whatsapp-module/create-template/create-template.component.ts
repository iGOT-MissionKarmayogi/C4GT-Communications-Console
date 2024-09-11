import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router';
import { PropServiceService } from '../../services/prop-service.service';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-create-WhatsApp-template',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateWhatsAppTemplateComponent implements OnInit {
  name: string = '';
  category: string = '';
  bodyText: string = '';
  examples: string[] = [''];
  senderNumber: string | null = null;
  language: string = 'en';
  allowCategoryChange: boolean = false;
  showSuccessMessage: boolean = false;
  
  constructor(
    private http: HttpClient,
    private propService: PropServiceService,
    private whatsappService: WhatsappTemplateService
  ) {}

  ngOnInit() {
    this.senderNumber = this.propService.getSenderNumber();
  }

  addExample() {
    this.examples.push('');
  }

  onSubmit() {
    const templateData = {
      senderNumber: this.senderNumber,
      name: this.name,
      language: this.language,
      category: this.category,
      allowCategoryChange: this.allowCategoryChange,
      structure: {
        body: {
          text: this.bodyText,
          examples: this.examples.filter(example => example !== '')
        },
        type: 'TEXT'
      }
    };

    console.log('Template creation started');
    console.log(templateData.structure.body.examples);
    
    this.whatsappService.createTemplate(templateData).subscribe(
      data => {
        console.log(data);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000); // Hide message after 5 seconds
      },
      error => {
        console.error('Error:', error);
        alert("Some error occurred while creating template!");
        console.log("Template was not created because: ", error);
      }
    );
  }
}
