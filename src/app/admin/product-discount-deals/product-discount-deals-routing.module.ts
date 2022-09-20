import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDiscountDealsComponent } from './product-discount-deals.component';

const routes: Routes = [
  { path: '', component: ProductDiscountDealsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDiscountDealsRoutingModule { }
