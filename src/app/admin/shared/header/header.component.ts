import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
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
  adminDataObserver: any;

  constructor(
    private auth: AuthenticationService,
    private headerService: HeaderService,
    private router: Router,
    private adminService: AdminService
  ) {
    this.page = headerService.getPage();
    
    this.headerDataObserver = this.headerService.getDataObservable();
    this.headerDataObserver.subscribe((data: any) => {
        console.log('observarable', data);
        // this.page = data.page;
      }
    );

    this.adminDataObserver = this.adminService.getDataObservable();
    this.adminDataObserver.subscribe((data: any) => {
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

}
