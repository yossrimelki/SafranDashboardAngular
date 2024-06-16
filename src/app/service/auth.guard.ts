// login.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false; // Return false to prevent access to the login page
    }
    return true; // Allow access to the login page
  }
}
