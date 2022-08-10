import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';
import { OrderDetailsComponent } from './order-details.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    SharedModule,
    AdminHeaderModule
  ], providers:[ConfirmationService]
})
export class OrderDetailsModule { }
