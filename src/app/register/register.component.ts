import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      role : ['', Validators.required]
    })
  }
  

  onSubmit(): void {
    this.http.post<{UserInterface: any}>('http://127.0.0.1:8000/api/auth/register/', this.form.getRawValue())
      .subscribe((response) => 
      {
        console.log('response', response);
        this.authService.currentUserAuth.set(response.UserInterface);
        this.router.navigate(['/login']);
      }); 
  }
}
