import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onUserLoadServers() {
    // this.router.navigate(['servers']);
    /*The above, we do not set the relative url, therefore, it is always '/' (localhost:4200/)
    But the below example, we set the relative url to the current active url using ActivatedRoute*/

    // this.router.navigate(['servers'], {relativeTo: this.activatedRoute});
    /*since the current active route/url is at localhost:4200/users,
    Therefore without '/', this command will cause error. To fix, just add '/'*/

    this.router.navigate(['/servers'], {relativeTo: this.activatedRoute});
  }
}
