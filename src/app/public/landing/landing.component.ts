import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.isLoggedIn()
    .then((data) => {
      this.router.navigate(['/leaner']);
    })
    .catch(err => {
      
    });
  }

}
