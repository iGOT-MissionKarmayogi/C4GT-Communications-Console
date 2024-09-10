import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = 'http://localhost:5000/api/email/templates'; 

  constructor(private http: HttpClient) {}

  updateTemplate(templateId: string, newTemplate: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${templateId}`, newTemplate);
  }
}