import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './setting/account/account.component';
import { BillingComponent } from './setting/billing/billing.component';
import { CloseComponent } from './setting/close/close.component';
import { NotificationComponent } from './setting/notification/notification.component';
import { PrivacyComponent } from './setting/privacy/privacy.component';
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
    component: SettingComponent,
    children: [{
      path: '',
      component: AccountComponent
    }, {
      path: 'billing',
      component: BillingComponent
    }, {
      path: 'notification',
      component: NotificationComponent
    }, {
      path: 'privacy',
      component: PrivacyComponent
    }, {
      path: 'close',
      component: CloseComponent
    }]
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
