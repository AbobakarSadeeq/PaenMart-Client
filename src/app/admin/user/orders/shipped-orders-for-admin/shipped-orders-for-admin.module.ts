import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippedOrdersForAdminRoutingModule } from './shipped-orders-for-admin-routing.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ShippedOrdersForAdminComponent } from './shipped-orders-for-admin.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [ShippedOrdersForAdminComponent],
  imports: [
    CommonModule,
    ShippedOrdersForAdminRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],providers:[ConfirmationService]
})
export class ShippedOrdersForAdminModule { }
