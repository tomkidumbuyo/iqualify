import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  adminDataObserver: any;

  constructor(
    private adminService: AdminService
  ) { 
    
    this.adminDataObserver = this.adminService.getDataObservable();
    this.adminDataObserver.subscribe((data: any) => {
        console.log('observarable', data);
      }
    );
    this.adminService.setPage('analytics')
  }

  ngOnInit(): void {
  }

}
