import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductDealsRoutingModule } from './update-product-deals-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';
import { UpdateProductDealsComponent } from './update-product-deals.component';


@NgModule({
  declarations: [UpdateProductDealsComponent],
  imports: [
    CommonModule,
    UpdateProductDealsRoutingModule,
    SharedModule,
    AdminHeaderModule
  ], providers: [ConfirmationService]
})
export class UpdateProductDealsModule { }
