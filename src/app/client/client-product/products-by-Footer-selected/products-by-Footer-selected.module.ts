import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsByBrandRoutingModule } from './products-by-Footer-selected-routing.module';
import { ProductsByFooterSelected } from './products-by-Footer-selected.component';
import { Footer } from 'primeng/api';
import { NavbarModule } from '../../navbar/navbar.module';
import { FooterModule } from '../../footer/footer.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [ProductsByFooterSelected],
  imports: [
    CommonModule,
    ProductsByBrandRoutingModule,
    FooterModule,
    NavbarModule,
    SharedModule
  ]
})
export class ProductsByBrandModule { }
