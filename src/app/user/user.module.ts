import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UserComponent } from './user.component';
import { ScoreIllustrationComponent } from './shared/score-illustration/score-illustration.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './setting/account/account.component';
import { NotificationComponent } from './setting/notification/notification.component';
import { PrivacyComponent } from './setting/privacy/privacy.component';
import { BillingComponent } from './setting/billing/billing.component';
import { CloseComponent } from './setting/close/close.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SettingComponent,
    UserComponent,
    AccountComponent,
    NotificationComponent,
    PrivacyComponent,
    BillingComponent,
    CloseComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
