import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAccountBalanceComponent } from './admin-account-balance.component';

const routes: Routes = [
  {path:"", component:AdminAccountBalanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAccountBalanceRoutingModule { }
