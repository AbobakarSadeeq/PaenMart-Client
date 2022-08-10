import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipperPaymentRoutingModule } from './shipper-payment-routing.module';
import { ShipperPaymentComponent } from './shipper-payment.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from '../../../shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [ShipperPaymentComponent],
  imports: [
    CommonModule,
    ShipperPaymentRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers: [ConfirmationService]
})
export class ShipperPaymentModule { }
