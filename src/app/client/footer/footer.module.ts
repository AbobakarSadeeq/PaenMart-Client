import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
