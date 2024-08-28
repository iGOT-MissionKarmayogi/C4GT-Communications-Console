import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  searchUsers(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/search`, requestBody);
  }
}
