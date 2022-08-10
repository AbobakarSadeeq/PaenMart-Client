import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class HomeModule { }
