import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn()
    .then((data) => {
      console.log('AUTHENTICATED');
    })
    .catch(err => {
      this.router.navigate(['/auth/login']);
    });
  }

}
