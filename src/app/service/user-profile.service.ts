import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://127.0.0.1:8000/api/auth'; // backend API URL

  constructor(
    private http: HttpClient
  ) { }

  getUserProfile(role: string): Observable<any> {
    const url = `${this.apiUrl}/${role.toLowerCase()}/profile`;
    return this.http.get<any>(url);
  }
}
