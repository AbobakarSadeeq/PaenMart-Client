import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderDetailRoutingModule } from './client-order-detail-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../../navbar/navbar.module';
import { ClientOrderDetailComponent } from './client-order-detail.component';


@NgModule({
  declarations: [ClientOrderDetailComponent],
  imports: [
    CommonModule,
    ClientOrderDetailRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class ClientOrderDetailModule { }
