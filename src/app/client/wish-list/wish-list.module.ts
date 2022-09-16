import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishListRoutingModule } from './wish-list-routing.module';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { WishListComponent } from './wish-list.component';


@NgModule({
  declarations: [WishListComponent],
  imports: [
    CommonModule,
    WishListRoutingModule,
    FooterModule,
    NavbarModule,
    SharedModule
  ]
})
export class WishListModule { }
