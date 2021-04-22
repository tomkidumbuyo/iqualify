import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CertificatesComponent } from './certificates/certificates.component';


@NgModule({
  declarations: [DashboardComponent, MyCoursesComponent, CertificatesComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
