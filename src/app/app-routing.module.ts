import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  // for routing

import {ServerComponent} from './servers/server/server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersComponent} from './users/users.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {UserComponent} from './users/user/user.component';
import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]},
  {path: 'servers', component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}
    ]},
  {path: 'page-not-found', component: PageNotFoundComponent}, // redirecting & wildcard routes
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
