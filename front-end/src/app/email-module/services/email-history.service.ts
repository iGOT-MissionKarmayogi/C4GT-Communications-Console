import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailHistoryService {
  private apiUrl = 'http://localhost:5000/api/email/history';

  constructor(private http: HttpClient) {}

  getEmailHistory(): Observable<any[]> {
	return this.http.get<any[]>(this.apiUrl,{withCredentials: true});
  }
}
