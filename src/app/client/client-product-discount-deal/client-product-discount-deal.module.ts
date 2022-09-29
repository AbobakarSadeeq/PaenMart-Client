import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProductDiscountDealRoutingModule } from './client-product-discount-deal-routing.module';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ClientProductDiscountDealComponent } from './client-product-discount-deal.component';


@NgModule({
  declarations: [ClientProductDiscountDealComponent],
  imports: [
    CommonModule,
    ClientProductDiscountDealRoutingModule,
    FooterModule,
    NavbarModule,
    SharedModule
  ]
})
export class ClientProductDiscountDealModule { }
