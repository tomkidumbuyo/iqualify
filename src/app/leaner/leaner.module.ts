import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeanerComponent } from './leaner.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CourseComponent } from './course/course.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LessonComponent } from './lesson/lesson.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ScoreIllustrationComponent } from './shared/score-illustration/score-illustration.component';
import { TopicComponent } from './topic/topic.component';
import { LeanerRoutingModule } from './leaner-routing.module'
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LeanerComponent,
    DashboardComponent, 
    MyCoursesComponent, 
    CertificatesComponent, 
    FooterComponent, 
    HeaderComponent, 
    CourseComponent, 
    TopicComponent, 
    LessonComponent, 
    ScoreIllustrationComponent
  ],
  imports: [
    CommonModule,
    LeanerRoutingModule,
    SharedModule
  ]
})
export class LeanerModule { }
