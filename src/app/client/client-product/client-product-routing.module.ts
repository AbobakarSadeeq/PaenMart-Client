import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProductComponent } from './client-product.component';

const routes: Routes = [
  {path:'', component:ClientProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProductRoutingModule { }
