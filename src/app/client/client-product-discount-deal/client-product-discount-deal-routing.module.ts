import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProductDiscountDealComponent } from './client-product-discount-deal.component';

const routes: Routes = [
  {path:'', component:ClientProductDiscountDealComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProductDiscountDealRoutingModule { }
