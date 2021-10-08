import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService} from '../services/authentication.service';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const currentUser = this.authenticationService.currentUserValue;
  let access = false ;
  console.log(route);
  if (currentUser) {
      if(route.data.roles)
      {
          route.data.roles.forEach((obj: string) => {

              if (currentUser.roles.find(x=>x == obj ))
              {
                  access = true ;
                  // authorised so return true
                  return true;
              }else {// role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
              }
          });

      }

      // authorised so return true
      return true;
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
}

}
