import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { CertificatesComponent } from './dashboard/certificates/certificates.component';
import { CourseComponent } from './course/course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeanerComponent } from './leaner.component';
import { LessonComponent } from './lesson/lesson.component';
import { MyCoursesComponent } from './dashboard/my-courses/my-courses.component';
import { TopicComponent } from './topic/topic.component';
import { HomeComponent } from './dashboard/home/home.component';

const routes: Routes = [{
  path: 'leaner',
  component: LeanerComponent,
  children: [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: DashboardComponent,
    children: [{
      path: '',
      component: HomeComponent
    }, {
      path: 'mycourses',
      component: MyCoursesComponent
    }, {
      path: 'certificates',
      component: CertificatesComponent
    }]
  }, {
    path: 'course',
    component: CourseComponent
  }, {
    path: 'topic',
    component: TopicComponent
  }, {
    path: 'lesson',
    component: LessonComponent
  }, {
    path: 'buy',
    component: BuyComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeanerRoutingModule { }
