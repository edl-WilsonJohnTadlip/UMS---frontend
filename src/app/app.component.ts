import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'project-user-management-frontend';
  authService = inject(AuthService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    initFlowbite();
  }

  logout(){
    localStorage.setItem('token', '');
    this.authService.currentUserAuth.set(null);
    this.router.navigate(['/login']);
  }

}
