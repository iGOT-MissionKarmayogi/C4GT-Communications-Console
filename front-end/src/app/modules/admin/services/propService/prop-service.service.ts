import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropServiceService {
  private medium: string | null = null;

  constructor(private http: HttpClient) {}

  setMedium(medium: string) {
    this.medium = medium;
  }

  getMedium(): string | null {
    return this.medium;
  }

  fetchTemplates(type: string): Observable<any[]> {
    console.log("fetching started")
    const apiUrl = `http://localhost:5000/api/templates/${type}`;
    return this.http.get<any[]>(apiUrl,{withCredentials:true});
    console.log("Fetching done and returned.")
  }
}
