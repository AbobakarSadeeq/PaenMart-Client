import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { CityComponent } from './city.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]
})
export class CityModule { }
