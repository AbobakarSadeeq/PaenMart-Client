import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsoredAdRoutingModule } from './sponsored-ad-routing.module';
import { SponsoredAdComponent } from './sponsored-ad.component';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [SponsoredAdComponent],
  imports: [
    CommonModule,
    SponsoredAdRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]
})
export class SponsoredAdModule { }
