import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      // Redirect to admin page
      this.router.navigate(['/admin']);
      return true;
    } else if (role === 'supervisor') {
      // Redirect to supervisor page
      this.router.navigate(['/supervisor']);
      return true;
    } else if (role === 'user') {
      // Redirect to user page
      this.router.navigate(['/user']);
      return true;
    } else {
      // Redirect to login page if role is not recognized
      this.router.navigate(['/login']);
      return false;
    }
  }
}