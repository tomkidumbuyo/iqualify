import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UserComponent } from './user.component';
import { CourseComponent } from './course/course.component';
import { TopicComponent } from './topic/topic.component';
import { LessonComponent } from './lesson/lesson.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    MyCoursesComponent, 
    CertificatesComponent, 
    FooterComponent, 
    HeaderComponent, 
    UserComponent, 
    CourseComponent, 
    TopicComponent, 
    LessonComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
