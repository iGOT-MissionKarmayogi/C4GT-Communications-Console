import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from '../../pipes/highlighter.pipe';
import { VariablePopupComponent } from '../variable-popup/variable-popup.component';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-configure-template',
  standalone: true,
  imports: [RouterModule,CommonModule,HighlightPipe,VariablePopupComponent],
  templateUrl: './configure-template.component.html',
  styleUrl: './configure-template.component.css'
})
export class ConfigureTemplateComponent implements OnInit {
  serviceTitle: string = 'SMS-Service';
  selectedTemplateId: number | null = null;
  templates: any[] = [];
  selectedMedium: string | null = null;
  selectedTemplate: any | null = null;
  showPopup: boolean = false;
  content : string = '';
  showSuccessMessage: boolean | undefined;

  constructor(private http: HttpClient , 
    private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:5000/api/templates/sms',{withCredentials: true})
      .subscribe({
        next: (data:any) => {
          console.log('Data:', data);
          this.templates = data.data;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }
  selectTemplate(template: any) {
    this.selectedTemplateId = this.selectedTemplateId === template._id ? null : template._id;
  }

  onRadioClick(templateId: number) {
    this.selectedTemplateId = templateId;
    this.selectedTemplate = this.templates.find(template => template._id === templateId);
    console.log(this.selectedTemplate);
  }

  handleUpdateTemplate(updatedVariables: any[]) {
    if (this.selectedTemplate) {
      updatedVariables.forEach(variable => {
        if(variable.type=== "userDefined"){
          this.selectedTemplate.Content = this.selectedTemplate.Content.replace(`{{${variable.name}}}`, variable.value);
        }
        });
      console.log(this.selectedTemplate);
      this.content = this.selectedTemplate.Content;
      this.updateTemplateOnServer(this.selectedTemplate);
      // 
    }
    this.showPopup = false;
  }


  onSelectButtonClick() {
    console.log("hello")
    if (this.selectedTemplate) {
      console.log("hello")
      this.showPopup = true;
    }
  }

  handleCancel() {
    this.showPopup = false;
  }

  updateTemplateOnServer(template: any) {
    const body = { content: template.Content };
    this.http.put(`http://localhost:5000/api/templates/update/${template._id}`, body, { withCredentials: true })
      .subscribe({
        next: (response:any) => {
          this.showSuccessMessage = true;
          console.log('Template updated:', response);
        },
        error: (error) => {
          console.error('Error updating template:', error);
        }
      });
  }
}
