import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminProfile } from '../admin/admin-profile';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserProfile } from '../user/user-profile';

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

  updateAdminProfile(id: number, updatedProfile: AdminProfile): Observable<any> {
    console.log('Updating admin profile:', updatedProfile);
    const url = `${this.apiUrl}/admin/${id}/profile`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.put<AdminProfile>(url, updatedProfile, { headers });
  }

  deleteAdminProfile(id: number): Observable<any> {
    const url = `${this.apiUrl}/admin/${id}/profile`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.delete(url, { headers });
  }

  //Method to fetch users based on logged-in user's role
  getUsers(): Observable<any> {
    const role = this.authService.getUserRole(); // Get the user's role
    const headers = this.createHeaders(); // Create headers with authentication token

    // API endpoint based on user's role
    let endpoint = '';
    if (role === 'admin') {
      endpoint = `${this.apiUrl}/admin/users`;
    } else if (role === 'supervisor') {
      endpoint = `${this.apiUrl}/supervisor/users`;
    }
    
    if (!endpoint) {
      console.log('Invalid user role:', endpoint);
    }

    // Make HTTP GET request to fetch users
    // return this.http.get<any>(endpoint, { headers });
    return this.http.get<any>(endpoint, { headers })
  }

  // Method to fetch user profile by user ID
  getUserProfile(userId: number): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}/profile`; // Assuming apiUrl is defined
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching user profile:', error);
        throw error; // Use throw to propagate the error
      })
    );
  }

  
  

}
