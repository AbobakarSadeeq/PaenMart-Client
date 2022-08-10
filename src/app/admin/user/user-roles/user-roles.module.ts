import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutingModule } from './user-roles-routing.module';
import { UserRolesComponent } from './user-roles.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';


@NgModule({
  declarations: [UserRolesComponent],
  imports: [
    CommonModule,
    UserRolesRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]

})
export class UserRolesModule { }
