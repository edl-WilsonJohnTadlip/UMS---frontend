import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth'; // backend API URL
  private userId: number | null = null; // User ID stored in memory

  constructor(
    private http: HttpClient,
    public messageService: MessageService
    ) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials).pipe(
      tap(response => {
        if (response && response.access_token) {
          this.handleLoginSuccess(response);
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('role', response.role[0]);
          localStorage.setItem('user_id', response.user_id.toString());      
        }
      }),
      catchError(error => {
        this.handleLoginError(error);
        return throwError(() => error);
      })
    );
  }

  private handleLoginSuccess(response: any): void {
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('role', response.role[0]);
    localStorage.setItem('user_id', response.user_id.toString());
  }

  private handleLoginError(error: any): void {
    if (error && error.error && error.error.message) {
      this.messageService.setErrorMessage(error.error.message);
    } else {
      this.messageService.setErrorMessage('An error occurred. Please try again later.');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('user_id');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }
}
