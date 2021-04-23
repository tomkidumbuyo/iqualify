import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'learner/home',
  pathMatch: 'full'
},{
  path: 'learner',
  component: UserComponent,
  children: [{
    path: 'home',
    component: DashboardComponent
  }, {
    path: 'mycourses',
    component: MyCoursesComponent
  }, {
    path: 'certificates',
    component: CertificatesComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
