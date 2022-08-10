import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientOrderDetailComponent } from './client-order-detail.component';

const routes: Routes = [
  {path:"" , component:ClientOrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientOrderDetailRoutingModule { }
