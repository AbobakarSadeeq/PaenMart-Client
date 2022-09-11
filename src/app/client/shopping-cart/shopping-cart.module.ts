import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';


@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
    NavbarModule,
    FooterModule
  ],
  providers:[ConfirmationService]
})
export class ShoppingCartModule { }
