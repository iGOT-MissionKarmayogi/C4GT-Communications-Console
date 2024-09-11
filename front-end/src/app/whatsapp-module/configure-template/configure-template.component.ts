import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PropServiceService } from '../../services/prop-service.service';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';
import { NavigatorService } from '../Services/navigator.service';
import { OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-configure-WhatsApp-template',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule,TooltipModule],
  templateUrl: './configure-template.component.html',
  styleUrl: './configure-template.component.css'
})
export class ConfigureWhatsAppTemplateComponent implements OnInit {
  isClosing: boolean = false;
  loading:boolean=false;
  senderNumber: string | null = null;
  name: string = '';
  language: string = 'en';
  category: string = '';
  allowCategoryChange: boolean = false;
  bodyText: string = '';
  examples: string[] = [''];
  showSuccessMessage: boolean = false;

  constructor(
    private http: HttpClient,
    private propService: PropServiceService,
    private whatsappService: WhatsappTemplateService,
    private navigatorService: NavigatorService
  ) {}

  ngOnInit() {
    this.senderNumber = this.propService.getSenderNumber();
    if(this.navigatorService.getSelectedTemplate()==null){
      alert("Please select a template first!")
    }
    else{this.loadTemplateData();}
  }

  loadTemplateData() {
    this.loading=true;
    const selectedTemplateId = this.navigatorService.getSelectedTemplate();
    if (selectedTemplateId) {
      this.whatsappService.getSingleTemplate(selectedTemplateId).subscribe(
        data => {
          this.loading=false;
          this.name = data.name;
          this.category = data.category;
          this.bodyText = data.structure.body.text;
          this.examples = data.structure.body.examples.length > 0 ? data.structure.body.examples : [''];
        },
        error => {
          console.error('Error fetching template data:', error);
          this.loading=false;
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
    var selectedTemplateId = this.navigatorService.getSelectedTemplate();
    const templateData = {
      senderNumber: this.senderNumber,
      name: this.name,
      templateId:selectedTemplateId,
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
    console.log(templateData);

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