import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import { ServersService } from '../servers.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  queryParamsSubscription: Subscription;
  fragmentSubscription: Subscription;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('----- Fetch queryParams & fragment on Init -----');
    console.log(this.activatedRoute.snapshot.queryParams);  // fetch query params on Init
    console.log(this.activatedRoute.snapshot.fragment);   // fetch fragment on Init

    console.log('----- Fetch queryParams & fragment on value changed detected -----');
    console.log(this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe());  // value is at _subscriptions > [] > _subject > _value
    console.log(this.fragmentSubscription = this.activatedRoute.fragment.subscribe());    // value is at _subscriptions > [] > _subject > _value

    // this.activatedRoute.queryParams.subscribe( (params: Params) => { console.log(params); } );
    // this.activatedRoute.fragment.subscribe( (params: string) => { console.log(params); } );

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.fragmentSubscription.unsubscribe();
  }
}
