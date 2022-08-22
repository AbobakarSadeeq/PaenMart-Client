import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOrderReviewComponent } from './client-order-review.component';

const routes: Routes = [
  { path: '', component: ClientOrderReviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientOrderReviewRoutingModule { }
