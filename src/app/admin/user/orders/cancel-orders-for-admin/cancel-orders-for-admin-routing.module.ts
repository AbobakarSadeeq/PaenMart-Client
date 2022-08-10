import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelOrdersForAdminComponent } from './cancel-orders-for-admin.component';

const routes: Routes = [
  {path:'', component:CancelOrdersForAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelOrdersForAdminRoutingModule { }
