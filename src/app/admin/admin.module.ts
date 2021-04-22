import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { SingleComponent } from './courses/single/single.component';
import { AllComponent } from './courses/all/all.component';
import { NewComponent } from './courses/new/new.component';
import { LessonsComponent } from './courses/single/lessons/lessons.component';
import { NewTopicComponent } from './courses/single/new-topic/new-topic.component';
import { NewLessonComponent } from './courses/single/new-lesson/new-lesson.component';
import { StudentsComponent } from './courses/single/students/students.component';
import { EarningsComponent } from './earnings/earnings.component';
import { LessonComponent } from './lesson/lesson.component';
import { AnalyticsComponent } from './analytics/analytics.component';


@NgModule({
  declarations: [CoursesComponent, SingleComponent, AllComponent, NewComponent, LessonsComponent, NewTopicComponent, NewLessonComponent, StudentsComponent, EarningsComponent, LessonComponent, AnalyticsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
