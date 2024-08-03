import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightPipe } from '../../../../pipes/highlighter.pipe';
import { PropServiceService } from '../../services/propService/prop-service.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HighlightPipe],
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.css'],
})
export class TemplateSelectorComponent implements OnInit {
  serviceTitle: string = 'SMS-Service';
  selectedTemplateId: number | null = null;
  templates: any[] = [];
  selectedMedium: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propService: PropServiceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type) {
        this.selectedMedium = type;
        this.fetchTemplates(type);
      }
    });
  }

  fetchTemplates(type: string) {
    this.propService.fetchTemplates(type).pipe(
      catchError(error => {
        console.error('Error fetching templates', error);
        return ([]); // Return an empty array in case of error
      })
    ).subscribe(
      (data:any) => {
        this.templates = data.data;
      }
    );
  }
  selectTemplate(template: any) {
    this.selectedTemplateId = this.selectedTemplateId === template.id ? null : template.id;
  }

  onRadioClick(templateId: number) {
    this.selectedTemplateId = templateId;
  }

  navigator() {
    if (this.selectedTemplateId !== null) {
      this.router.navigate(['/usetemplate', this.selectedTemplateId]);
    }
  }

  createtemplate() {
    this.router.navigate([`/dashboard/templates/${this.selectedMedium}/create`]);
  }
}
