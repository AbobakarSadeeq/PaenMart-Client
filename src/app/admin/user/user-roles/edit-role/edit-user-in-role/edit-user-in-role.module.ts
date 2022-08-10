import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserInRoleRoutingModule } from './edit-user-in-role-routing.module';
import { EditUserInRoleComponent } from './edit-user-in-role.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from 'src/app/admin/admin-header/admin-header.module';


@NgModule({
  declarations: [EditUserInRoleComponent],
  imports: [
    CommonModule,
    EditUserInRoleRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class EditUserInRoleModule { }
