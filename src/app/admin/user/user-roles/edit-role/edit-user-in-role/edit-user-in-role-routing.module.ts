import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserInRoleComponent } from './edit-user-in-role.component';

const routes: Routes = [
  {path:"", component:EditUserInRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserInRoleRoutingModule { }
