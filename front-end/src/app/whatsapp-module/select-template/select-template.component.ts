import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';
import { PropServiceService } from '../../services/prop-service.service';
import { RemoveBracesPipe } from '../Services/braces-transform.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigatorService } from '../Services/navigator.service';

@Component({
  selector: 'app-select-template',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, RemoveBracesPipe],
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.css']
})
export class SelectTemplateComponent implements OnInit {
  templates: any = null;
  selectedTemplateId: string | null = null;
  loading: boolean = true;
  currentPage: number = 0;
  totalPages: number = 1;
  pageSize: number = 4;
  templatesLoaded: boolean = false;
  showPopup: boolean = false;
  constructor(
    private whatsappService: WhatsappTemplateService,
    private propService: PropServiceService,
    private router: Router,
    private navigatorService: NavigatorService
  ) {}

  ngOnInit(): void {
    this.loading=true;
    this.getTemplates();
    const Templateid=this.navigatorService.getSelectedTemplate();
    if(Templateid!=null){
      this.selectedTemplateId=Templateid;
    }
  }

  getTemplates(): void {
    this.loading=true;
    this.whatsappService.getTemplates().subscribe(
      data => {
        this.templates = data.templates;
        console.log(data);
        this.templatesLoaded = true;
        this.loading = false;
      },
      error => console.error('Error:', error)
    );
  }

  onRadioClick(templateId: string): void {
    this.selectedTemplateId = templateId;
  }

  selectTemplate(template: any): void {
    this.propService.setSelectedTemplate(template);
    this.selectedTemplateId = template.id;
  }

  createTemplate(): void {
    this.router.navigate(['dashboard/whatsapp/create']);
  }

  navigate(): void {
    if (this.selectedTemplateId) {
      console.log("Now going to send message component!");
      console.log(this.navigatorService.getSelectedOption());
      this.navigatorService.setSelectedTemplate(this.selectedTemplateId);
      this.navigatorService.setSelectedOption("upload-user-data");
      console.log("This is selected option:", this.navigatorService.getSelectedOption());
    } else {
      console.log("Please select a template first then click submit!");
    }
  }
}
