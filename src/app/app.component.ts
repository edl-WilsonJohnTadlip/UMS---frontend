import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
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

  isRole = false;
  isMenuVisible = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    initFlowbite();
  }

  toggleMenu(){
    let currentPage = this.router.url;
    console.log(currentPage);
    let isRole = localStorage.getItem('role');
    if (currentPage === '/login' || currentPage === '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    switch (isRole) {
      case 'admin':
        this.isRole = true;
        break;
      case 'supervisor':
        this.isRole = true;
        break;
      case 'user':
        this.isRole = true;
        break;
      default:
        this.isRole = false;
        break;
    }
  }

  logout(): void {
    this.authService.logout(); // Call logout method from AuthService to clear user information
    this.router.navigate(['/login']); // Navigate to login page
  }
}



  // toggleMenu(){
  //   let currentPage = this.router.url;
  //   let storedRole = localStorage.getItem('role');
    
  //   this.isMenuVisible = !(currentPage === '/login' || currentPage === '/register');
    
  //   switch (storedRole) {
  //     case 'admin':
  //     case 'supervisor':
  //     case 'user':
  //       this.isRole = true;
  //       break;
  //     default:
  //       this.isRole = false;
  //       break;
  //   }
  // }