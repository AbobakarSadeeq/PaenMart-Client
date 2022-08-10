import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselRoutingModule } from './carousel-routing.module';
import { CarouselComponent } from './carousel.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    CarouselRoutingModule,
    SharedModule,
    AdminHeaderModule
  ],
  providers:[ConfirmationService]
})
export class CarouselModule { }
