import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProductDiscountDealRoutingModule } from './client-product-discount-deal-routing.module';
import { ClientProductDiscountDealComponent } from './client-product-discount-deal.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [ClientProductDiscountDealComponent],
  imports: [
    CommonModule,
    ClientProductDiscountDealRoutingModule,
    SharedModule,
    FooterModule,
    NavbarModule
  ]
})
export class ClientProductDiscountDealModule { }
