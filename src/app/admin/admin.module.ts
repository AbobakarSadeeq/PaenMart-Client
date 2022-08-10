import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHeaderModule } from './admin-header/admin-header.module';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/Modules/shared.module';




@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminHeaderModule,
    RouterModule,
    NgApexchartsModule,
    SharedModule
  ]
})
export class AdminModule { }
