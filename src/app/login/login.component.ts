import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../user.interface';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  role: string[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    public messageService: MessageService
  )
  {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    //check if the form is valid
    if (this.form.valid) {
      //call authService to handle login
      this.authService.login(this.form.getRawValue())
        .subscribe({
          next: response => {
            console.log(response); // Optional: Log the response for debugging purposes
          // The token and role are already stored in localStorage by the AuthService
          // No need to set them again here
            const role = this.authService.getUserRole(); // Get the user's role from the AuthService
          
            // Route the user to the appropriate component based on their role
            switch (role) {
              case 'admin':
                this.router.navigate(['admin']);
                break;
              case 'supervisor':
                this.router.navigate(['supervisor']);
                break;
              case 'user':
                this.router.navigate(['user']);
                break;
              default:
                this.router.navigate(['/login']); // Handle other roles or unauthorized access
                break;
              }
            },
          error: error => {
            // Handle login errors here (e.g., display error message to the user)
            console.error('Login failed:', error);
            // Handle login errors here (e.g., display error message to the user)
            // For example, you can set a message in your message service to display a login error toast
            this.messageService.setErrorMessage("Login failed. Please try again.");
          }
      });
      } else {
        // Mark all form controls as touched to trigger validation messages
        this.form.markAllAsTouched();
        this.messageService.setErrorMessage("Please correct the errors and try again.");
    }
  }
  
  // Convenience getters for easy access to form controls in the template
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
    }
}
    

