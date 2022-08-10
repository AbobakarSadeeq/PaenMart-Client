import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingPendingOrdersForAdminRoutingModule } from './shipping-pending-orders-for-admin-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderComponent } from 'src/app/admin/admin-header/admin-header.component';
import { ShippingPendingOrdersForAdminComponent } from './shipping-pending-orders-for-admin.component';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [ShippingPendingOrdersForAdminComponent],
  imports: [
    CommonModule,
    ShippingPendingOrdersForAdminRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],providers:[ConfirmationService]
})
export class ShippingPendingOrdersForAdminModule { }
