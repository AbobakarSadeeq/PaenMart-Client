import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProductDealsComponent } from './update-product-deals.component';

const routes: Routes = [
  { path: '', component: UpdateProductDealsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateProductDealsRoutingModule { }
