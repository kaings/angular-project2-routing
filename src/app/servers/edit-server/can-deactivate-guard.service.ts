import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot,} from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivateComponent: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate (component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentRouterState: RouterStateSnapshot,
                 nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivateComponent();
  }
}
