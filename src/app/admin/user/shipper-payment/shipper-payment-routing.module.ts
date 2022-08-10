import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperPaymentComponent } from './shipper-payment.component';

const routes: Routes = [
  {path:'', component:ShipperPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperPaymentRoutingModule { }
