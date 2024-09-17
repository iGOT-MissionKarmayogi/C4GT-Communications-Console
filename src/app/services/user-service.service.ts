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
  private errorMessageSubject: any;
  private formData: any;

  constructor(private http: HttpClient) {}

  searchUsers(requestBody: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/v1/search`, requestBody);
  }

  setResponseData(data: any) {
    this.responseData = data;
  }

  setErrorMessage(message: string | null) {
    this.errorMessageSubject = message;
  }

  getErrorMessage() {
    return this.errorMessageSubject;
  }

  getResponseData() {
    return this.responseData;
  }

  saveFormData(data: any): void {
    this.formData = data;
    console.log('Form data saved:', this.formData);
  }

  getSavedFormData(): any {
    console.log('Form data retrieved:', this.formData);
    return this.formData;
  }
}
