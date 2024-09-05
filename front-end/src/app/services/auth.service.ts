import { Observable, map, of, throwError,catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient) {}

  setUser(token: string): void {
    localStorage.setItem('user', token);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  login({ email, password }: any): Observable<any> {
    const loginUrl = 'http://localhost:5000/api/auth/login';
    const body = { email, password };

    const options = {
      withCredentials: true,
      credentials:true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.http.post<any>(loginUrl, body,options).pipe(
      map((response) => {
        if (response && response.data) {
          this.setUser(response.data);
        } else {
          throw new Error('Invalid response from server');
        }
      }),
      catchError((error) => {
        // console.error('Failed to login', error.error.message  );
        return error // Handle and propagate error
      })
    );
  }
}