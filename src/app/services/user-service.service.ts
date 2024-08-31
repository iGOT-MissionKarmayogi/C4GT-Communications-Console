import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = environment.apiUrl;
  private responseData: any;
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  searchUsers(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/v1/search`, requestBody);
  }

  setResponseData(data: any) {
    this.responseData = data;
  }

  setErrorMessage(message: string | null) {
    this.errorMessageSubject.next(message);
  }

  getErrorMessage() {
    return this.errorMessageSubject.getValue();
  }

  getResponseData() {
    return this.responseData;
  }
}
