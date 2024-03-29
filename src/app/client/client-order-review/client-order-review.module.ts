import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderReviewRoutingModule } from './client-order-review-routing.module';
import { ClientOrderReviewComponent } from './client-order-review.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ClientSingleProductReviewComponent } from './client-single-product-review/client-single-product-review.component';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [ClientOrderReviewComponent],
  imports: [
    CommonModule,
    ClientOrderReviewRoutingModule,
    SharedModule,
    NavbarModule,
    FooterModule
  ]
})
export class ClientOrderReviewModule { }
