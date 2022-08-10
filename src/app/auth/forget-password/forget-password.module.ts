import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from 'src/app/client/navbar/navbar.module';


@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class ForgetPasswordModule { }
