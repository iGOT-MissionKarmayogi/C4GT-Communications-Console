import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PropServiceService } from '../../services/prop-service.service';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';

@Component({
  selector: 'app-create-WhatsApp-template',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateWhatsAppTemplateComponent {
  isClosing:boolean=false;
  
  senderNumber: string | null = null;
  name: string = '';
  language: string = 'en';
  category: string = '';
  allowCategoryChange: boolean = false;
  bodyText: string = '';
  examples: string[] = [''];

  constructor(
    private http: HttpClient,
    private propService: PropServiceService,
    private whatsappService: WhatsappTemplateService,
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
    console.log(templateData.structure.body.examples)
    this.whatsappService.createTemplate(templateData).subscribe(
      data => {
        console.log(data);
        alert("Template Created Successfully!")
      },
      error => {
        console.error('Error:', error);
        alert("Some error occurred while creating template!")
        console.log("Template was not creatred because: ",error)
      }
    );
  }


}
