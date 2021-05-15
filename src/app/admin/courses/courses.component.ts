import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  adminDataObserver: any;

  constructor(
    private adminService: AdminService
  ) { 
    
    this.adminDataObserver = this.adminService.getDataObservable();
    this.adminDataObserver.subscribe((data: any) => {
        console.log('observarable', data);
      }
    );
    this.adminService.setPage('courses')
  }

  ngOnInit(): void {
  }

}
