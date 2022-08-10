import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippedOrdersForAdminComponent } from './shipped-orders-for-admin.component';

const routes: Routes = [
  {path:'', component:ShippedOrdersForAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippedOrdersForAdminRoutingModule { }
