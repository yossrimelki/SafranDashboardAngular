import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Assuming you place the interface in a file called user.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsersUsernameAleasAndRole(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/username-aleas-role`);
  }

  updateUser(id: number, updatedUser: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, updatedUser);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
