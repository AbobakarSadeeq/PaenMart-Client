import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/Modules/shared.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule

  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
