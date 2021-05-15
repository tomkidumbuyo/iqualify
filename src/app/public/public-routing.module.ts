import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { LandingComponent } from './landing/landing.component';
import { PublicComponent } from './public.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'public',
  pathMatch: 'full'
}, {
  path: 'public',
  component: PublicComponent,
  children: [{
    path: '',
    component: LandingComponent
  }, {
    path: 'courses',
    component: CoursesComponent,
  }, {
    path: 'categories',
    component: CategoriesComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
