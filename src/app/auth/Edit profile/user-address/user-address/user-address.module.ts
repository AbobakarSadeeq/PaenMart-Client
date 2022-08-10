import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddressRoutingModule } from './user-address-routing.module';
import { UserAddressComponent } from './user-address.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [UserAddressComponent],
  imports: [
    CommonModule,
    UserAddressRoutingModule,
    SharedModule
  ],
  exports: [UserAddressComponent]

})
export class UserAddressModule { }
