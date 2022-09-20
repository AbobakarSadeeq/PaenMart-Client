import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDiscountDealsRoutingModule } from './product-discount-deals-routing.module';
import { ProductDiscountDealsComponent } from './product-discount-deals.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';
import { AddProductDealsComponent } from './add-product-deals/add-product-deals.component';


@NgModule({
  declarations: [ProductDiscountDealsComponent],
  imports: [
    CommonModule,
    ProductDiscountDealsRoutingModule,
    SharedModule,
    AdminHeaderModule
  ], providers: [ConfirmationService]
})
export class ProductDiscountDealsModule { }
