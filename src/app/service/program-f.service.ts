import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProgramF } from '../models/program-f';

@Injectable({
  providedIn: 'root'
})
export class ProgramFService {
  private baseUrl = 'http://localhost:8080/programF';

  constructor(private http: HttpClient) { }

  getPrograms(): Observable<ProgramF[]> {
    return this.http.get<ProgramF[]>(`${this.baseUrl}/retrieve-all-programs`)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveProgram(programId: number): Observable<ProgramF> {
    return this.http.get<ProgramF>(`${this.baseUrl}/retrieve-program/${programId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProgram(program: ProgramF): Observable<ProgramF> {
    return this.http.post<ProgramF>(`${this.baseUrl}/add-program`, program)
      .pipe(
        catchError(this.handleError)
      );
  }

  modifyProgram(program: ProgramF): Observable<ProgramF> {
    return this.http.put<ProgramF>(`${this.baseUrl}/modify-program`, program)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeProgram(programId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-program/${programId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An error occurred. Please try again later.');
  }
}
