import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = environment.apiUrl;
  private responseData: any;

  constructor(private http: HttpClient) {}

  searchUsers(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/v1/search`, requestBody);
  }

  setResponseData(data: any) {
    this.responseData = data;
  }

  getResponseData() {
    return this.responseData;
  }
}
