import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductBrandRoutingModule } from './product-brand-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';
import { ProductBrandComponent } from './product-brand.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';


@NgModule({
  declarations: [ProductBrandComponent],
  imports: [
    CommonModule,
    ProductBrandRoutingModule,
    SharedModule,
    AdminHeaderModule

  ],
  providers:[ConfirmationService]
})
export class ProductBrandModule { }
