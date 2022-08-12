import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchProductRoutingModule } from './search-product-routing.module';
import { SearchProductComponent } from './search-product.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [SearchProductComponent],
  imports: [
    CommonModule,
    SearchProductRoutingModule,
    SharedModule,
    NavbarModule
  ]
})
export class SearchProductModule { }
