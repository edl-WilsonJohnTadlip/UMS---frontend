import { Component } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})

export class AdminComponent {

  adminProfile: any;

  constructor(
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.getUserProfile();
    // Retrieve the admin user ID from the authentication service
    const userId = this.authService.getUserId();

    if (userId !== null) {
      // Use the retrieved user ID to fetch the admin profile
      this.getAdminProfile(userId);
    } else {
      console.error('User ID is null.'); // Handle null user ID case
    }
  }

  getAdminProfile(id: number): void {
    // Call the getUserProfile method from UserProfileService to fetch user profile data
    // Assuming you have a method in UserProfileService to fetch user profile for the logged-in user
    this.userProfileService.getAdminProfile(id).subscribe({
      next: (data) => {
        this.adminProfile = data; // Assign fetched user profile data to userProfile variable
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  logout(): void {
      this.authService.logout(); // Call logout method from AuthService to clear user information
      this.router.navigate(['/login']); // Navigate to login page
    }

}


  // ngOnInit(): void {
  //   // Call the getUserProfile method from the service to fetch user profile data
  //   this.userProfileService.getUserProfile()
  //   .subscribe((response) => {
  //     // Assign the response data to the userProfile variable
  //       this.userProfile = response;
  //     },
  //     (error) =>
  //       console.error('Error fetching user profile', error)
  //   )
  // }

  


