import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Retrieve expected role from route data
    const expectedRole = route.data.expectedRole.toLowerCase();
    console.log('expectedRole', expectedRole);

    // Retrieve user's role from AuthService and convert to lowercase
    const userRole = this.authService.getUserRole().toLowerCase(); // Use optional chaining to avoid errors if role is null
    console.log('userRole', userRole);

    // Log the route data before navigating
    // console.log("Route Data:", route.data); // Log the route data

    // Check if user's role is available and matches the expected role (case-insensitive)
    if (userRole === null || userRole !== expectedRole) {
      // User's role does not match the expected role, redirect to unauthorized page
      console.error('Unauthorized page for current logged in User');
      this.router.navigate(['/login']); // Redirect to login page
      // this.authService.logout(); // Clear stored token and role from local storage
      return false;
    }

    // Allow access if user's role matches expected role
    return true;
  }
}

