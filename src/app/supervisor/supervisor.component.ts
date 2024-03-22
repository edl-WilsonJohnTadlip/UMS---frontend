import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from '../service/user-profile.service';
import { catchError,tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.css'
})
export class SupervisorComponent {

  users: any[] = [];
  SupervisorProfile: any;
  profileForm: FormGroup;


  constructor(
    private authService: AuthService,
    private router: Router,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.initializeForm();
    this.initializeSupervisorProfile();
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
  
  initializeSupervisorProfile(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (data) => {
          this.SupervisorProfile = data;
          console.log('Supervisor profile:', this.SupervisorProfile);
          this.profileForm.patchValue({
            email: this.SupervisorProfile.email,
            fname: this.SupervisorProfile.fname,
            lname: this.SupervisorProfile.lname,
            password: this.SupervisorProfile.password,
            repeat_password: this.SupervisorProfile.password,
            address: this.SupervisorProfile.address,
            phonenumber: this.SupervisorProfile.phonenumber,
            gender: this.SupervisorProfile.gender,
            age: this.SupervisorProfile.age,
            role: this.SupervisorProfile.role
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

  fetchUsers(): void {
    this.userProfileService.getUsers()
      .pipe(
        tap((data) => {
          // console.log('Received data:', data);
          // Assign the data to a property in your component
          this.users = data.users; // Assuming 'users' is the array of users in the received data
        }),
        catchError((error) => {
          console.error('Error fetching users:', error);
          // Return an empty array or handle the error as per your requirement
          return of([]); // Returning an empty array as a fallback
        })
      )
      .subscribe();
  }


  logout(): void {
    this.authService.logout(); // Call logout method from AuthService to clear user information
    this.router.navigate(['/login']); // Navigate to login page
  }
  
}

