import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingPendingOrdersForAdminComponent } from './shipping-pending-orders-for-admin.component';

const routes: Routes = [
  {path:'', component:ShippingPendingOrdersForAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingPendingOrdersForAdminRoutingModule { }
