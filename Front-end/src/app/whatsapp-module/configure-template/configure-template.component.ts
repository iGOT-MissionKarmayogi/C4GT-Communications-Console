import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PropServiceService } from '../../services/prop-service.service';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';
import { NavigatorService } from '../Services/navigator.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-WhatsApp-template',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './configure-template.component.html',
  styleUrl: './configure-template.component.css'
})
export class ConfigureWhatsAppTemplateComponent implements OnInit {
  isClosing: boolean = false;

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
    private navigatorService: NavigatorService
  ) {}

  ngOnInit() {
    this.senderNumber = this.propService.getSenderNumber();
    this.loadTemplateData();
    if(this.navigatorService.getSelectedTemplate()==null){
      alert("Please select a template first!")
    }
  }

  loadTemplateData() {
    const selectedTemplateId = this.navigatorService.getSelectedTemplate();
    if (selectedTemplateId) {
      this.whatsappService.getSingleTemplate(selectedTemplateId).subscribe(
        data => {
          this.name = data.name;
          this.category = data.category;
          this.bodyText = data.structure.body.text;
          this.examples = data.structure.body.examples.length > 0 ? data.structure.body.examples : [''];
        },
        error => {
          console.error('Error fetching template data:', error);
        }
      );
    } else {
      console.error('No template selected');
    }
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

    console.log('Template modification started');
    console.log(templateData.structure.body.examples);

    this.whatsappService.modifyTemplate(templateData).subscribe(
      data => {
        console.log(data);
        alert("Template Modified Successfully!")
      },
      error => {
        console.error('Error:', error);
        alert("Some error occurred while modifying template!")
        console.log("Template was not modified because: ", error);
      }
    );
  }
}