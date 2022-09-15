import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderRoutingModule } from './client-order-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ClientOrderComponent } from './client-order.component';
import { ConfirmationService } from 'primeng/api';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';


@NgModule({
  declarations: [ClientOrderComponent],
  imports: [
    CommonModule,
    ClientOrderRoutingModule,
    SharedModule,
    NavbarModule,
    FooterModule
  ],
  providers:[ConfirmationService]
})
export class ClientOrderModule { }
