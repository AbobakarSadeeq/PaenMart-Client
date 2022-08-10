import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperShipmentOrdersComponent } from './shipper-shipment-orders.component';

const routes: Routes = [
  {path:'', component:ShipperShipmentOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperShipmentOrdersRoutingModule { }
