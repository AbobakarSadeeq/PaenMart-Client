import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSingleProductReviewComponent } from './client-single-product-review.component';

const routes: Routes = [
  {path:'', component:ClientSingleProductReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSingleProductReviewRoutingModule { }
