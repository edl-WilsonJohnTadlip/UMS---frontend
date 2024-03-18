import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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
    this.http.post<{access_token: string}>('http://127.0.0.1:8000/api/auth/login/', this.form.getRawValue(),)
      .subscribe( (response) => 
      {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        // localStorage.setItem('Role', response.user.role);
        // this.authService.currentUserAuth.set(response.UserInterface);
        this.router.navigate(['home']);
      }); 
  }
}
