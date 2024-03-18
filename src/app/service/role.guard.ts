// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Retrieve user's role from AuthService
    const userRole = this.authService.getUserRole();

    // Check if user's role matches the expected role
    if (userRole !== expectedRole) {
      // Redirect to unauthorized page or handle as needed
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // Allow access if user's role matches expected role
    return true;
  }
}
