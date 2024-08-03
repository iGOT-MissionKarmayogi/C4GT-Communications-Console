import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from '../../pipes/highlighter.pipe';

@Component({
  selector: 'app-configure-template',
  standalone: true,
  imports: [RouterModule,CommonModule,HighlightPipe],
  templateUrl: './configure-template.component.html',
  styleUrl: './configure-template.component.css'
})
export class ConfigureTemplateComponent implements OnInit {
  serviceTitle: string = 'SMS-Service';
  selectedTemplateId: number | null = null;
  templates: any[] = [];
  selectedMedium: string | null = null;
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
