import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductDealsRoutingModule } from './add-product-deals-routing.module';
import { AddProductDealsComponent } from './add-product-deals.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [AddProductDealsComponent],
  imports: [
    CommonModule,
    AddProductDealsRoutingModule,
    SharedModule,
    AdminHeaderModule
  ], providers: [ConfirmationService]

})
export class AddProductDealsModule { }
