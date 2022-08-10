import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]
})
export class UserModule { }
