import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelOrdersForAdminRoutingModule } from './cancel-orders-for-admin-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { CancelOrdersForAdminComponent } from './cancel-orders-for-admin.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [CancelOrdersForAdminComponent],
  imports: [
    CommonModule,
    CancelOrdersForAdminRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],providers:[ConfirmationService]
})
export class CancelOrdersForAdminModule { }
