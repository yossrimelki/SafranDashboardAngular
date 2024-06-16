import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Formation } from '../models/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private baseUrl = 'http://localhost:8080/formation';

  constructor(private http: HttpClient) { }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/retrieve-all-formations`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  retrieveFormation(formationId: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/retrieve-formation/${formationId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
  getAllFormationsByProgram(programId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/retrieve-formations-by-program/${programId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
  

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.baseUrl}/add-formation`, formation)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  modifyFormation(formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.baseUrl}/modify-formation`, formation)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  removeFormation(formationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-formation/${formationId}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('An error occurred. Please try again later.');
  }
}
