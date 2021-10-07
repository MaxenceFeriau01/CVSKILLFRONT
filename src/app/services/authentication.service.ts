import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer' + localStorage.getItem('token'),

  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //private currentUser: User;
  private currentUserSubject: BehaviorSubject<User> | null;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')|| '')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User|null {
    
    return this.currentUserSubject?this.currentUserSubject.value : null;
  }

  login(credentials:any) {  
    return this.http
      .post<any>(`${environment.uri_api}users/authenticate`, credentials)
      .pipe(
        first(
          (res) => {
            if (res && res.token) {
              localStorage.setItem('token', res.token);
              localStorage.setItem('currentUser', JSON.stringify(res));              
              this.currentUserSubject?this.currentUserSubject.next(res):null; 
              return res;
            }
          },
          (err:any) => { console.error(err);
            this.logout();
          }
        )
      );
  }

  logout() {
    if(localStorage.getItem('token') && localStorage.getItem('currentUser'))
    {
       // remove user from local storage to log user out
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');     
      this.router.navigate(['login']);
    }
   
  }

  getCurrentUser() {
    return this.currentUserSubject?.value;
  }

  isGrantedWithOneAtLeast(permissions: string[]): boolean {
    for (let permission of permissions) {
      let rolesArray:Array<string>;
      if(this.getCurrentUser() &&
      this.getCurrentUser()?.roles){
        rolesArray=this.getCurrentUser()?.roles ||[];
      }else{
        rolesArray=[];
      }    

      if (rolesArray.length > 0
      ) {
        for (let role of rolesArray) {
          if (role === permission) return true;
        }
      }
    }
    return false;
  }

  resetPassword(email:string) {
    let body ={"email":email};
   
    return this.http
      .post<any>(
        `${environment.uri_api}users/resetPassword`, body,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  changePassword(object: any) {
    console.log('passwd call');
    return this.http
      .post<any>(`${environment.uri_api}users/changePassword`,  object , httpOptions);
      
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
}