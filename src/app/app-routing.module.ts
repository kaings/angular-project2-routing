import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  // for routing

import {ServerComponent} from './servers/server/server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UsersComponent} from './users/users.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {UserComponent} from './users/user/user.component';
import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';
import {AuthGuard} from './auth-guard.service';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolver} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]},
  {path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve: {serverData: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
  // {path: 'page-not-found', component: PageNotFoundComponent}, // redirecting & wildcard routes
  {path: 'page-not-found', component: ErrorPageComponent, data: {message: 'Page Not Found!'}},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
