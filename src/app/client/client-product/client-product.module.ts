import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProductRoutingModule } from './client-product-routing.module';
import { ClientProductComponent } from './client-product.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ProductsByFooterSelected } from './products-by-Footer-selected/products-by-Footer-selected.component';


@NgModule({
  declarations: [ClientProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    NavbarModule,
    ClientProductRoutingModule
  ]
})
export class ClientProductModule { }
