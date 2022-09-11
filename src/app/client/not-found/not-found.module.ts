import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { NotFoundComponent } from './not-found.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';




@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
     NotFoundRoutingModule,
     SharedModule,
     NavbarModule,
     FooterModule
  ]
})
export class NotFoundModule { }
