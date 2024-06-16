import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Metier } from '../models/metier';
@Injectable({
  providedIn: 'root'
})
export class MetierService {
  private metierUrl = 'http://localhost:8080/metier';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
   console.error('An error occurred:', error);
   return throwError(() => new Error('An error occurred while processing your request. Please try again later.'));
  }

  getAllMetiers(): Observable<Metier[]> {
    return this.http.get<Metier[]>(`${this.metierUrl}/retrieve-all-metiers/`).pipe( // Removed extra space after this.metierUrl
      catchError(this.handleError)
    );
  }

  createMetier(metier: Metier): Observable<Metier> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Ensure this token management strategy aligns with your security compliance
      'Content-Type': 'application/json'
    });

    return this.http.post<Metier>(`${this.metierUrl}/add-metier`, metier, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateMetier(metier: Metier): Observable<Metier> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<Metier>(`${this.metierUrl}/modify-metier`, metier, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteMetier(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.delete(`${this.metierUrl}/remove-metier/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
