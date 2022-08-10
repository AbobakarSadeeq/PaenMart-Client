import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizedImagesRoutingModule } from './authorized-images-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AuthorizedImagesComponent } from './authorized-images.component';
import { ConfirmationService } from 'primeng/api';
import { NavbarModule } from 'src/app/client/navbar/navbar.module';
import { UserAddressModule } from '../user-address/user-address/user-address.module';


@NgModule({
  declarations: [AuthorizedImagesComponent],
  imports: [
    CommonModule,
    AuthorizedImagesRoutingModule,
    SharedModule,
    NavbarModule,
    UserAddressModule
  ],
  providers:[ConfirmationService]
})
export class AuthorizedImagesModule { }
