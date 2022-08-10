import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/Modules/shared.module';
import { AuthComponent } from './auth.component';
import { AdminHeaderModule } from '../admin/admin-header/admin-header.module';
import { NavbarModule } from '../client/navbar/navbar.module';
import { UserAddressComponent } from './Edit profile/user-address/user-address/user-address.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NavbarModule

  ]
})
export class AuthModule { }
