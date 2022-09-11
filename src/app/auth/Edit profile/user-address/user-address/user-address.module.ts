import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddressRoutingModule } from './user-address-routing.module';
import { UserAddressComponent } from './user-address.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { FooterModule } from 'src/app/client/footer/footer.module';


@NgModule({
  declarations: [UserAddressComponent],
  imports: [
    CommonModule,
    UserAddressRoutingModule,
    SharedModule,
    FooterModule
  ],
  exports: [UserAddressComponent]

})
export class UserAddressModule { }
