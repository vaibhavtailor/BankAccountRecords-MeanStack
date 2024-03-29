import { Injectable } from '@angular/core';
import { Account } from './account'; 
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) {}

  // Add account
  AddAccount(data: Account): Observable<any> {
    let API_URL = `${this.endpoint}/add-account`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Get all accounts
  GetAccounts() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get account
  GetAccount(id: any): Observable<any> {
    let API_URL = `${this.endpoint}/read-account/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map(res => { 
        return res || {} 
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update account
  UpdateAccount(id: any, data: any): Observable<any> {
    let API_URL = `${this.endpoint}/update-account/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete account
  DeleteAccount(id: any): Observable<any> {
    var API_URL = `${this.endpoint}/delete-account/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }
  
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}