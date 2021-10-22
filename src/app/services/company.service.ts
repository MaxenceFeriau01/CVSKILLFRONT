import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  
  constructor(private http: HttpClient) {
  }

  handleError(error: any) {
    console.log("I HANDLE ERROR", error);
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

  getAll(pageNumber?:number, size?:number, id?:number, name?:string, contact?:string): Observable<Company[]> {
    let params = new HttpParams();
    if (pageNumber !== undefined) {
      pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
      params = params.append("page", pageNumber);
    }
    if (size !== undefined) {
      params = params.append("size", size);
    }
    if (id !== undefined) {
      params = params.append("id", id);
    }
    if (name !== undefined) {
      params = params.append("name", name);
    }
    if (contact !== undefined) {
      params = params.append("contact", contact);
    }

    return this.http.get<Company[]>(
      `${environment.uri_api}companies/`, { params })
      .pipe(catchError(this.handleError));
  }

  getById(id:number): Observable<Company> {
    return this.http.get<Company>(`${environment.uri_api}companies/` + id)
      .pipe(catchError(this.handleError));
  }
}