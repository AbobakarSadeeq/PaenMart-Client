import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingOrdersForAdminComponent } from './pending-orders-for-admin.component';

const routes: Routes = [
  {path:'', component:PendingOrdersForAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingOrdersForAdminRoutingModule { }
