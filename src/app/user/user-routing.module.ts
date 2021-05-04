import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
  path: 'user',
  component: UserComponent,
  children: [{
    path: '',
    component: ProfileComponent,
  }, {
    path: 'setting',
    component: SettingComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
