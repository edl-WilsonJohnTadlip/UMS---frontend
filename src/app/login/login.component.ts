import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../user.interface';
import { AuthService } from '../service/auth.service';


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
    private authService: AuthService
  )
  {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
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
        }
      });
  }
}
