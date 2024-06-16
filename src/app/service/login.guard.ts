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
      this.router.navigate(['/program']);
      return false; // Prevent access to the login page if already logged in
    }
    return true; // Allow access to the login page
  }
}
