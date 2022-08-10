import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormStructureComponent } from './dynamic-form-structure.component';

const routes: Routes = [
  {path:"", component:DynamicFormStructureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormStructureRoutingModule { }
