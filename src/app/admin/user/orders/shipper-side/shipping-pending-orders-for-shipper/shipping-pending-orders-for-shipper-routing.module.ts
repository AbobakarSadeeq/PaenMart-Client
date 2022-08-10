import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingPendingOrdersForShipperComponent } from './shipping-pending-orders-for-shipper.component';

const routes: Routes = [
  {path:'', component:ShippingPendingOrdersForShipperComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingPendingOrdersForShipperRoutingModule { }
