import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingOrdersForAdminRoutingModule } from './pending-orders-for-admin-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { PendingOrdersForAdminComponent } from './pending-orders-for-admin.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [PendingOrdersForAdminComponent],
  imports: [
    CommonModule,
    PendingOrdersForAdminRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],providers:[ConfirmationService]
})
export class PendingOrdersForAdminModule { }
