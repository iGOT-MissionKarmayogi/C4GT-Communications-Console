import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WhatsappTemplateService } from '../Services/whatsapp-service.service';
import { PropServiceService } from '../../services/prop-service.service';
import { RemoveBracesPipe } from '../Services/braces-transform.pipe';

@Component({
  selector: 'app-send-whatsapp',
  standalone: true,
  imports: [RouterModule, CommonModule,FormsModule,RemoveBracesPipe],
  templateUrl: './send-whatsapp.component.html',
  styleUrl: './send-whatsapp.component.css'
})


export class SendWhatsAppComponent implements OnInit {
  templates: any = null;
  selectedTemplateId: string | null = null
  loading:boolean=true;
  currentPage: number = 0;
  totalPages:number=1;
  pageSize: number = 4;
  templatesloaded:boolean=false;
  showPopup: boolean = false;

  constructor(
    private whatsappService: WhatsappTemplateService,
    private propService: PropServiceService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getTemplates();
  }
  

  getTemplates(): void {
    this.whatsappService.getTemplates().subscribe(
      data => {
        this.templates = data.templates,
        console.log(data);
        this.templatesloaded=true;
      },
      error => console.error('Error:', error)
    );
    this.loading=false;
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
    if(this.selectedTemplateId){
      console.log("Now going to send message component!")
    }else{
      console.log("Please select a template first then click submit.")
    }
  }
  

}
