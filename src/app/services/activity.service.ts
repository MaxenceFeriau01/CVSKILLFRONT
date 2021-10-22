import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activity } from '../models/activity.model'

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  
  constructor(private http: HttpClient) {
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAll(): Observable<Activity[]> {

    return this.http.get<Activity[]>(
      `${environment.uri_api}activities/`)
      .pipe(catchError(this.handleError));
  }

  getById(id:number): Observable<Activity> {
    return this.http.get<Activity>(`${environment.uri_api}activities/` + id)
      .pipe(catchError(this.handleError));
  }
}