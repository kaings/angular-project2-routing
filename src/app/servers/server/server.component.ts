import {Component, OnDestroy, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramSubscription: Subscription;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.server = this.serversService.getServer(1);
    const serverId = +this.activatedRoute.snapshot.params['id'];   // adding '+' in front will parse the result (string) into integer
    // to convert the retrieve id<string> and convert into id<number>, can use '+' in front or simply 'parseInt()'
    this.server = this.serversService.getServer(serverId);

    this.paramSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(parseInt(params['id'], 0));
        // learn more about parseInt radix parameter...'0' represents octal
      }
    );
  }

  ngOnDestroy() {

  }

  onEditServer() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
    /* queryParamsHandling: 'merge' to merge the old & new queryParams. 'preserve' is only to keep the old one (new one if available,
    will be replaced by the old one */
  }
}
