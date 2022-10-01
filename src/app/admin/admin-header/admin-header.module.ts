import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/Modules/shared.module';



@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [AdminHeaderComponent]
})
export class AdminHeaderModule { }

