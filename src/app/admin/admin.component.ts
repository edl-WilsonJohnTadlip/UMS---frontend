import { Component } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';
import { AuthService } from '../service/auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})

export class AdminComponent {

  users: any[] = [];
  adminProfile: any;
  selectedGender: string | null = null;
  profileForm: FormGroup; // Define profileForm as a FormGroup
  
  skills: string[] = []; // Array to store fetched skills
  selectedSkill: string | undefined; // Variable to store the selected skill from the dropdown
  userSkills: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    private router: Router,
    public messageService: MessageService
  ){}

  ngOnInit(): void {
    this.initializeAdminProfile();
    this.initializeForm(); // Initialize the form
    this.fetchUsers(); // Fetch users
    this.fetchSkills(); // Fetch skills when the component initializes
    this.fetchUserSkills()
  }

  initializeForm(): void {
    // Initialize profileForm with empty values or default values
    this.profileForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.minLength(6)]], 
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  fetchSkills(): void {
    this.userProfileService.fetchSkills().subscribe(
      skills => {
        this.skills = skills; // Store fetched skills in the array
      },
      error => {
        console.error('Error fetching skills:', error);
        // Handle error
      }
    );
  }

  fetchUserSkills(): void {
    this.userProfileService.getUserSkills().subscribe(
      (skills: string[]) => {
        console.log('Fetched user skills:', skills);
        this.userSkills = skills;
      },
      (error) => {
        console.error('Error fetching user skills:', error);
      }
    );
  }

  onSelectSkill(skill: string): void {
    this.selectedSkill = skill; // Set the selected skill
  }

  // Method to add the selected skill to the user's skills table
  addSelectedSkill(): void {
    if (this.selectedSkill) {
      // Check if the user is authenticated
      if (this.authService.isLoggedIn()) {
        // User is authenticated, proceed with adding the skill
        this.userProfileService.addSkillToUser(this.selectedSkill).pipe(
          catchError((error) => {
            // Log the error
            console.error('Error adding selected skill:', error);
            // Handle the error gracefully
            // You can also return an observable with a fallback value or rethrow the error
            return of(null); // Returning of(null) will allow the subscription to continue without error
          })
        ).subscribe(
          () => {
            // Handle success
            console.log('Selected skill added to user:', this.selectedSkill);
          }
        );
      } else {
        // User is not authenticated, redirect to the login page
        this.router.navigate(['/login']);
      }
    } else {
      // Handle case when no skill is selected
    }
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

  initializeAdminProfile(): void {
    // Retrieve the user ID from the authentication service
    const userId = this.authService.getUserId();

    if (userId !== null) {
      this.userProfileService.getAdminProfile(userId).subscribe({
        next: (data) => {
          this.adminProfile = data;
          console.log('Admin profile:', this.adminProfile);
          this.profileForm.patchValue({
            email: this.adminProfile.email,
            fname: this.adminProfile.fname,
            lname: this.adminProfile.lname,
            password: this.adminProfile.password,
            repeat_password: this.adminProfile.password,
            address: this.adminProfile.address,
            phonenumber: this.adminProfile.phonenumber,
            gender: this.adminProfile.gender,
            age: this.adminProfile.age,
            role: this.adminProfile.role
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

  getAdminProfile(id: number): void {
    // Call the getUserProfile method from UserProfileService to fetch user profile data
    // Assuming you have a method in UserProfileService to fetch user profile for the logged-in user
    this.userProfileService.getAdminProfile(id).subscribe({
      next: (data) => {
        this.adminProfile = data; // Assign fetched user profile data to userProfile variable
        // Prefill the form fields with the user's data
        this.profileForm.patchValue({
          email: this.adminProfile.email,
          fname: this.adminProfile.fname,
          lname: this.adminProfile.lname,
          password: this.adminProfile.password,
          repeat_password: this.adminProfile.password,
          address: this.adminProfile.address,
          phonenumber: this.adminProfile.phonenumber,
          gender: this.adminProfile.gender,
          age: this.adminProfile.age,
          role: this.adminProfile.role,
      });
        const genderControl = this.profileForm.get('gender');
          if (genderControl && this.adminProfile.gender) {
          genderControl.setValue(this.adminProfile.gender);
      }
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }

  isProfileDataChanged(): boolean {
    const currentProfileData = this.profileForm.value;
    // Compare current profile data with the original adminProfile
    return JSON.stringify(currentProfileData) !== JSON.stringify(this.adminProfile);
  }

  // Helper method to validate all form fields and display error messages
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  

  onSubmit() {
    if (this.profileForm.value) {
      // Prepare the data to be submitted
      if (this.isProfileDataChanged()) {
      const userId = this.authService.getUserId(); // Retrieve the user ID from the authentication service
      
  
      if (userId !== null) {
        const updatedProfile = this.profileForm.value;
        console.log(updatedProfile, userId);
        // Submit the form data
        this.userProfileService.updateAdminProfile(userId, updatedProfile).subscribe({
          next: (response) => {
            // Handle successful submission
            console.log('Profile updated successfully:', response);
            this.messageService.setSuccessMessage('Profile updated successfully'); // Display success toaster message
            //resset the form
            this.profileForm.reset();
            // Fetch the updated profile data
            this.initializeAdminProfile();
            // Optionally, navigate to a success page or display a success message
            this.router.navigate(['/admin']); // Optionally, navigate to a success page
          },
          error: (error) => {
            // Handle submission errors
            console.error('Error updating profile:', error);
            // Optionally, display an error message to the user
            // Display error toaster message
            this.messageService.setErrorMessage('Error updating profile. Please try again.');
          }
        });
      } else {
        console.error('User ID is null.'); // Handle null user ID case
        // Display error toaster message
        this.messageService.setErrorMessage('Something went wrong. Please log in again.'); 
      }
      }
      else {
        // Display info toaster message
        this.messageService.setSuccessMessage('No changes were made.'); 
      }
    } else {
      // Form is invalid, display error messages
      this.validateAllFormFields(this.profileForm);
    }
  }
 

  deleteUser(userId: number) {
    // Get the ID of the currently logged-in user
    const currentUserId = this.authService.getUserId();

    // Check if the user is trying to delete their own profile
    if (userId === currentUserId) {
        alert('You cannot delete your own profile.');
        return; // Exit the method early
    }
    if (confirm('Are you sure you want to delete this user?')) {
        this.userProfileService.deleteAdminProfile(userId)
        .pipe(
            catchError((error: any) => {
            // Handle error appropriately
            console.error('Error deleting user:', error);
            return throwError(() => error); // Rethrow the error to be caught by the caller
          })
        )
        .subscribe(() => {
          // Update UI or perform any necessary actions on successful deletion
          const navigationExtras: NavigationExtras = {
            replaceUrl: true
          };
          this.router.navigate([this.router.url], navigationExtras);
          console.log('User deleted successfully.');
        });
      }
  }

  logout(): void {
      this.authService.logout(); // Call logout method from AuthService to clear user information
      this.router.navigate(['/login']); // Navigate to login page
  }

}



