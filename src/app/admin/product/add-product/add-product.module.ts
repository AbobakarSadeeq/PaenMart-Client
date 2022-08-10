import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { ProductComponent } from '../product.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    AdminHeaderModule,
  ]
})
export class AddProductModule { }
