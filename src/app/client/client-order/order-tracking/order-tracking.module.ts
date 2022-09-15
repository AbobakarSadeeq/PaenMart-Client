import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackingRoutingModule } from './order-tracking-routing.module';
import { OrderTrackingComponent } from './order-tracking.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../../navbar/navbar.module';
import { FooterModule } from '../../footer/footer.module';


@NgModule({
  declarations: [OrderTrackingComponent],
  imports: [
    CommonModule,
    OrderTrackingRoutingModule,
    SharedModule,
    NavbarModule,
    FooterModule
  ]
})
export class OrderTrackingModule { }
