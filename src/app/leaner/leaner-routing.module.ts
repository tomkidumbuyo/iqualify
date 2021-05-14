import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { CourseComponent } from './course/course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeanerComponent } from './leaner.component';
import { LessonComponent } from './lesson/lesson.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { TopicComponent } from './topic/topic.component';

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
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeanerRoutingModule { }
