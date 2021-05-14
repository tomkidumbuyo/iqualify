import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { PublicComponent } from './public.component';
import { CoursesComponent } from './courses/courses.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LandingComponent, PublicComponent, CoursesComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
