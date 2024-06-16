import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private BASE_URL = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) {}

  register(signRequest: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'api/auth/signup', signRequest);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'api/auth/signin', loginRequest);
  }

  hello(): Observable<any> {
    // Attach access token to the HTTP headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getAccessToken()
      })
    };
    return this.http.get(this.BASE_URL + 'api/hello', httpOptions);
  }

  logout() {
    localStorage.removeItem("token"); // Remove access token from local storage
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken(); // Check if access token exists
  }

  private getAccessToken(): string | null {
    return localStorage.getItem("token"); // Retrieve access token from local storage
  }

  setAccessToken(token:string) {
    localStorage.setItem("token", token); // Store access token in local storage
  }
}
