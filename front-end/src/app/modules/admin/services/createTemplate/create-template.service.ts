import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private apiUrl = 'https://api.example.com/templates'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  createTemplate(templateData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, templateData);
  }
}
