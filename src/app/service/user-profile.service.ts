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

  // Method to fetch pre-existing skills from the backend API
  fetchSkills(): Observable<string[]> {
    const url = `${this.apiUrl}/skills/index`;
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.get<string[]>(url, { headers });
  }

  // Method to fetch skills associated with the logged-in user
   // Method to fetch skills associated with the logged-in user
   getUserSkills(): Observable<string[]> {
    const userId = this.authService.getUserId(); // Get the user's ID
    if (!userId) {
      // Handle case when user ID is not available
      throw new Error('User ID not found');
    }
    const url = `${this.apiUrl}/skills/index/${userId}`; // API endpoint for fetching user skills
    const headers = this.createHeaders(); // Create headers with authentication token
    return this.http.get<string[]>(url, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching user skills:', error);
        throw error; // Propagate the error using the throw keyword
      })
    );
  }

  addSkillToUser(skill: string): Observable<any> {
    const userId = this.authService.getUserId();
    const url = `${this.apiUrl}/skills/store/${userId}`; // Adjust endpoint as per your API
    const headers = this.createHeaders();
    return this.http.post(url, { skill }, { headers });
  }

  removeSkillFromUser(skill: string): Observable<any> {
    const userId = this.authService.getUserId();
    const url = `${this.apiUrl}/skills/destroy/${userId}`; // Adjust endpoint as per your API
    const headers = this.createHeaders();
    return this.http.delete(url, { headers });
  }

  
  

}
