import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProductDetailComponent } from './client-product-detail.component';

const routes: Routes = [
  {path:'', component:ClientProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProductDetailRoutingModule { }
