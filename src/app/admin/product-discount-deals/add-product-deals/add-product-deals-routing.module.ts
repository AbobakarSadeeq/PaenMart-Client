import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductDealsComponent } from './add-product-deals.component';

const routes: Routes = [
  {path:"", component:AddProductDealsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductDealsRoutingModule { }
