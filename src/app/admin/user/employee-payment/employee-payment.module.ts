import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeePaymentRoutingModule } from './employee-payment-routing.module';
import { EmployeePaymentComponent } from './employee-payment.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [EmployeePaymentComponent],
  imports: [
    CommonModule,
    EmployeePaymentRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]
})
export class EmployeePaymentModule { }
