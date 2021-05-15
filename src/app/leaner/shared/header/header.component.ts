import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any = {};
  headerDataObserver: any;
  page: string;
  menuVisible = false;

  constructor(
    private auth: AuthenticationService,
    private headerService: HeaderService,
    private router: Router
  ) {
    this.page = headerService.getPage();
    
    this.headerDataObserver = this.headerService.getDataObservable();
    this.headerDataObserver.subscribe((data: any) => {
        console.log('observarable', data);
        this.page = data.page;
      }
    );
  }

  ngOnInit(): void {
    this.auth.isLoggedIn()
    .then((data: any) => {
      this.user = data;
    })
    .catch(err => {
      console.log('Error getting user.');
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

  toggleMenu() {
    console.log('here')
    this.menuVisible = this.menuVisible == false ? true : false;
  }

}
