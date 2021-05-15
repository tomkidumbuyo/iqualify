import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  adminDataObserver: any;

  constructor(
    private adminService: AdminService
  ) { 
    
    this.adminDataObserver = this.adminService.getDataObservable();
    this.adminDataObserver.subscribe((data: any) => {
        console.log('observarable', data);
      }
    );
    this.adminService.setPage('users')
  }

  ngOnInit(): void {
  }

}
