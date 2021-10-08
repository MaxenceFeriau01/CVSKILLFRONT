import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Inject } from '@angular/core';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(@Inject('authenticationService')private authenticationService: AuthenticationService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.status == 401){
                console.dir('console.dir');
                console.error('console.error');
                err.message = "vous devez vous reconnecter, vous êtes resté trop longtemps inactif";
               this.authenticationService.logout();
            }
            const error = err.message ;
            return throwError(error);
        }))
    }
}
