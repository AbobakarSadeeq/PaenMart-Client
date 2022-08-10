import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NotFoundComponent } from './not-found.component';
import { NavbarModule } from '../navbar/navbar.module';




@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
     NotFoundRoutingModule,
     SharedModule,
     NavbarModule
  ]
})
export class NotFoundModule { }
