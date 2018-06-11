import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        }
      );
  }
  canActivateChild(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot)
  : Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(activatedRoute, routeState);
  }
}
