import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '.././shared/shared-module';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { LoginService } from './login/login.service';

import { AccountRoutingModule } from './account-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    ActivateUserComponent
    ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,SharedModule
  ],
  providers: [LoginService]
})
export class AccountModule
{}
