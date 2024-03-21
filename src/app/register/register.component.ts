import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  generalErrorMessage: string = '';
  generalSuccessMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
    ) 
  {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      role : ['', Validators.required]
    },{
      validator: this.passwordMatchValidator // Add custom validator to check password match
    });
  }



  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    // Check if both fields have values and if they match
    if (password.value !== confirm_password.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  onSubmit(): void {
    // Log validity state of each form control
    Object.keys(this.form.controls).forEach(key => {
      console.log(`${key} validity:`, this.form.controls[key].valid);
      console.log(`${key} validity:`, this.form.controls[key].valid);
      console.log(`${key} dirty:`, this.form.controls[key].dirty);
      console.log(`${key} touched:`, this.form.controls[key].touched);
  });
    // Check if the form is valid before submitting
    if (this.form.valid) {
      // Remove dashes from the phone number
      // const phoneNumberWithoutDashes = String(this.form.get('phonenumber').value).replace(/-/g, '');
      // // Update the phone number value in the form
      // this.form.get('phonenumber').patchValue(phoneNumberWithoutDashes);
      // console.log('phonenumber', phoneNumberWithoutDashes);

      this.http.post<{UserInterface: any}>('http://127.0.0.1:8000/api/auth/register/', this.form.getRawValue())
      .subscribe((response) => 
      {
        console.log('response', response);
        this.generalSuccessMessage  = "You have successfully registered your account. Please login to continue.";
          // Set a timeout to remove the success message after 3 seconds
          setTimeout(() => {
            this.generalSuccessMessage = '';
            this.cd.detectChanges(); // Detect changes to update the view
            }, 3000);
            this.router.navigate(['/login']);
      },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
        // Handle error appropriately
        this.generalErrorMessage = "Please correct the errors and try again.";
      }
      );
    } else {
        Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
          console.error('Form errors:', this.form.errors);
      });
      // Optionally, display a general error message
      setTimeout(() => {
        this.generalErrorMessage = '';
        this.cd.detectChanges(); // Detect changes to update the view
        }, 2000);
        this.generalErrorMessage = "Please correct the errors and try again.";
    }
    }
  }
  
