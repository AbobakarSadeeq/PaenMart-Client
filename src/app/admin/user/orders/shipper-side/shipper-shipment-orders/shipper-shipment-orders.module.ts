import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipperShipmentOrdersRoutingModule } from './shipper-shipment-orders-routing.module';
import { ShipperShipmentOrdersComponent } from './shipper-shipment-orders.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [ShipperShipmentOrdersComponent],
  imports: [
    CommonModule,
    ShipperShipmentOrdersRoutingModule,
    SharedModule,
    AdminHeaderModule
  ], providers:[ConfirmationService]
})
export class ShipperShipmentOrdersModule { }
