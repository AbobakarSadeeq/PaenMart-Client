import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingPendingOrdersForShipperRoutingModule } from './shipping-pending-orders-for-shipper-routing.module';
import { ConfirmationService } from 'primeng/api';
import { ShippingPendingOrdersForShipperComponent } from './shipping-pending-orders-for-shipper.component';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [ShippingPendingOrdersForShipperComponent],
  imports: [
    CommonModule,
    ShippingPendingOrdersForShipperRoutingModule,
    AdminHeaderModule,
    SharedModule
  ], providers:[ConfirmationService]
})
export class ShippingPendingOrdersForShipperModule { }
