import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProductDetailRoutingModule } from './client-product-detail-routing.module';
import { ClientProductDetailComponent } from './client-product-detail.component';
import { NavbarModule } from '../../navbar/navbar.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [ClientProductDetailComponent],
  imports: [
    CommonModule,
    ClientProductDetailRoutingModule,
    NavbarModule,
    SharedModule
  ]
})
export class ClientProductDetailModule { }
