import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GrillePolyvalence } from '../models/GrillePolyvalence ';

@Injectable({
  providedIn: 'root'
})
export class GrillePolyvalenceService {
  private baseUrl = 'http://localhost:8080/grille-polyvalence';

  constructor(private http: HttpClient) { }

  getAllGrillePolyvalences(): Observable<GrillePolyvalence[]> {
    return this.http.get<GrillePolyvalence[]>(`${this.baseUrl}/retrieve-all-grille-polyvalences`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getGrillePolyvalenceById(grillePolyvalenceId: number): Observable<GrillePolyvalence> {
    return this.http.get<GrillePolyvalence>(`${this.baseUrl}/retrieve-grille-polyvalence/${grillePolyvalenceId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  addGrillePolyvalence(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-grille-polyvalence`, formData)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  updateGrillePolyvalence(grillePolyvalence: GrillePolyvalence): Observable<GrillePolyvalence> {
    return this.http.put<GrillePolyvalence>(`${this.baseUrl}/modify-grille-polyvalence`, grillePolyvalence)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  deleteGrillePolyvalence(grillePolyvalenceId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-grille-polyvalence/${grillePolyvalenceId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getGrillePolyvalencesByUserId(userId: number): Observable<GrillePolyvalence[]> {
    return this.http.get<GrillePolyvalence[]>(`${this.baseUrl}/retrieve-by-user/${userId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getGrillePolyvalencesByMetierId(metierId: number): Observable<GrillePolyvalence[]> {
    return this.http.get<GrillePolyvalence[]>(`${this.baseUrl}/retrieve-by-metier/${metierId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('An error occurred. Please try again later.');
  }
}
