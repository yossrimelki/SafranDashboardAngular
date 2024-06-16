import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      mat:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      aleas: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const signRequest = {
        username: this.registerForm.value.username,
        mat: this.registerForm.value.mat,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        roles: this.registerForm.value.roles,
        aleas: this.registerForm.value.aleas
      };

      this.jwtService.register(signRequest).subscribe(
        (response) => {
          console.log('User registered successfully!', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}