import { Component,Output, EventEmitter } from '@angular/core';
import { NavbarComponent } from '../../../modules/admin/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from '../../../pipes/highlighter.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PropServiceService } from '../../../services/prop-service.service';
import { WhatsappTemplateService } from '../../Services/whatsapp-service.service';
import { RemoveBracesPipe } from '../../Services/braces-transform.pipe';
import { WhatsappTemplateUserComponent } from '../Template-User/template-user.component';
import { WhatsappTemplateCreatorComponent } from "../Template-Creator/template-creator.component";

@Component({
  selector: 'app-whatsapp-template-selector',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RemoveBracesPipe, WhatsappTemplateCreatorComponent],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.css'
})
export class WhatsappTemplateSelectorComponent {
  @Output() close = new EventEmitter<void>();

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

   nextPage() {
    if(this.currentPage<this.totalPages){
      this.totalPages = Math.ceil(this.templates.length / this.pageSize);
      this.currentPage = this.currentPage + 1;
    }
  }
  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
  }
  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
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
      this.router.navigate(['dashboard/whatsapp/use',this.selectedTemplateId])
    }else{
      console.log("Please select a template first then click submit.")
    }
  }
  
}
