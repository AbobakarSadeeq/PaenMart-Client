import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProductRoutingModule } from './update-product-routing.module';
import { UpdateProductComponent } from './update-product.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [UpdateProductComponent],
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]

})
export class UpdateProductModule { }
