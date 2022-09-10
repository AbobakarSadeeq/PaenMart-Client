import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByFooterSelected } from './products-by-Footer-selected.component';

const routes: Routes = [
  { path: '', component: ProductsByFooterSelected }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsByBrandRoutingModule { }
