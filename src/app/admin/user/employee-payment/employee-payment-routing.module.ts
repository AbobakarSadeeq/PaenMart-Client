import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePaymentComponent } from './employee-payment.component';

const routes: Routes = [
  {path:"", component:EmployeePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePaymentRoutingModule { }
