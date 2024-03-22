import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { UserProfileService } from '../service/user-profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: any[] = [];
  userProfile: any;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private userProfileService: UserProfileService,
    private router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeUserProfile();
}

initializeForm(): void {
  this.profileForm = this.formBuilder.group({
    email: [''],
    fname: [''],
    lname: [''],
    password: [''],
    repeat_password: [''],
    address: [''],
    phonenumber: [''],
    gender: [''],
    age: [''],
    role: ['']
  });
}

initializeUserProfile(): void {
  // Retrieve the user ID from the authentication service
  const userId = this.authService.getUserId();

  if (userId !== null) {
    this.userProfileService.getUserProfile(userId).subscribe({
      next: (data) => {
        this.userProfile = data;
        console.log('User profile:', this.userProfile);
        this.profileForm.patchValue({
          email: this.userProfile.email,
          fname: this.userProfile.fname,
          lname: this.userProfile.lname,
          password: this.userProfile.password,
          repeat_password: this.userProfile.password,
          address: this.userProfile.address,
          phonenumber: this.userProfile.phonenumber,
          gender: this.userProfile.gender,
          age: this.userProfile.age,
          role: this.userProfile.role
        });
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  } else {
    console.error('User ID is null.'); // Handle null user ID case
  }
}

patchForm(): void {
  this.profileForm.patchValue({
    email: this.userProfile.email,
    fname: this.userProfile.fname,
    lname: this.userProfile.lname,
    password: this.userProfile.password,
    repeat_password: this.userProfile.password,
    address: this.userProfile.address,
    phonenumber: this.userProfile.phonenumber,
    gender: this.userProfile.gender,
    age: this.userProfile.age,
    role: this.userProfile.role
  });
}

fetchUsers(): void {
  this.userProfileService.getUsers().subscribe(
    (data) => {
      // console.log('Received data:', data);
      // Assign the data to a property in your component
      this.users = data.users; // Assuming 'users' is the array of users in the received data
      },
      (error) => {
        console.error('Error fetching users:', error);
    }
  );
}


logout(): void {
  this.authService.logout(); // Call logout method from AuthService to clear user information
  this.router.navigate(['/login']); // Navigate to login page
}

}


