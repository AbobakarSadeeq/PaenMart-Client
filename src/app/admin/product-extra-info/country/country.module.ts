import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [CountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]

})
export class CountryModule { }
