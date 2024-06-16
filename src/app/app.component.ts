import { Component } from '@angular/core';
import { JwtService } from './service/jwt.service';
import { Router } from '@angular/router';

interface NavRoute {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jwt-angular';
  isNavbarOpen: boolean = false;
  isLoggedIn: boolean = false;

  // Define routes for navbar buttons
  routes: NavRoute[] = [
    
    { path: 'users', label: 'Users' },
    { path: 'program', label: 'Program' },
    { path: 'formation', label: 'Formation' },
    { path: 'metier', label: 'Metier' },
    { path: 'grillepolyvalence', label: 'Grille Polyvalence' }
    
  ];

  constructor(public jwtService: JwtService, private router: Router) {
    this.isLoggedIn = jwtService.isLoggedIn();
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  logout() {
    this.jwtService.logout();
    this.isLoggedIn = false;
    // Redirect to login page after logout
    this.router.navigateByUrl('/login');
  }
}
