import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private jwtService: JwtService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Clear error message on component initialization
    this.errorMessage = '';

    // If user is already logged in, redirect to dashboard
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  submitForm() {
    const { username, password } = this.loginForm.value;
    const loginRequest = { username, password };
    this.jwtService.login(loginRequest).subscribe(
      (data) => {
        console.log(data);
        // Set the access token
        this.jwtService.setAccessToken(data.accessToken);
        // Redirect to dashboard upon successful login
        this.router.navigate(['/program']);
      },
      (error) => {
        console.log(error);
        // Set error message based on error response
        if (error.status === 401) {
          this.errorMessage = "Incorrect username or password.";
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
      }
    );
  }
  
}
