import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from 'src/app/client/navbar/navbar.module';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class ResetPasswordModule { }
