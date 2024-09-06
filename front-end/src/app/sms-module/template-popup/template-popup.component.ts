import { Component,EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-popup.component.html',
  styleUrl: './template-popup.component.css'
})
export class TemplatePopupComponent {
  templates: any[] = [];
  @Output() templateSelected = new EventEmitter<any>();
  @Output() popupClosed = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this.http.get<any[]>('http://localhost:5000/api/templates/sms', { withCredentials: true })
      .subscribe({
        next: (data: any) => {
          this.templates = data.data;
        },
        error: (error) => {
          console.error('Error fetching templates:', error);
        }
      });
  }

  selectTemplate(template: any) {
    this.templateSelected.emit(template);
  }

  closePopup() {
    this.popupClosed.emit();
  }
}
