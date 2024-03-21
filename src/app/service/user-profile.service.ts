import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminProfile } from '../admin/admin-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://127.0.0.1:8000/api'; // backend API URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }


  // Helper method to create HTTP headers with authentication token
  private createHeaders(): HttpHeaders {
    const authToken = this.authService.getToken(); // Get authentication token from AuthService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}` // Include the token in the Authorization header
    });
  }

  // Admin profile operations
  getAdminProfile(id: number): Observable<AdminProfile> {
    const url = `${this.apiUrl}/admin/${id}/profile`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.get<AdminProfile>(url, { headers });
  }

  updateAdminProfile(id: number, updatedProfile: AdminProfile): Observable<AdminProfile> {
    const url = `${this.apiUrl}/admin/${id}/profile`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.put<AdminProfile>(url, updatedProfile, { headers });
  }

  deleteAdminProfile(id: number): Observable<any> {
    const url = `${this.apiUrl}/admin/${id}/profile`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.delete(url, { headers });
  }
}
