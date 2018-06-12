import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ServersService} from '../servers.service';

export interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(currentRoute: ActivatedRouteSnapshot,
          currentRouterState: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+currentRoute.params['id']);
  }
}
