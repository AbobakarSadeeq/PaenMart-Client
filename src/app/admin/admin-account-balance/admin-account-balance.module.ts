import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAccountBalanceRoutingModule } from './admin-account-balance-routing.module';
import { AdminAccountBalanceComponent } from './admin-account-balance.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [AdminAccountBalanceComponent],
  imports: [
    CommonModule,
    AdminAccountBalanceRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]
})
export class AdminAccountBalanceModule { }
