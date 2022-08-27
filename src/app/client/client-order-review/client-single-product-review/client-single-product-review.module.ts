import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSingleProductReviewRoutingModule } from './client-single-product-review-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../../navbar/navbar.module';
import { ClientSingleProductReviewComponent } from './client-single-product-review.component';


@NgModule({
  declarations: [ClientSingleProductReviewComponent],
  imports: [
    CommonModule,
    ClientSingleProductReviewRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class ClientSingleProductReviewModule { }
