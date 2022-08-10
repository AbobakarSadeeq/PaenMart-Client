import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NestSubCategoryRoutingModule } from './nest-sub-category-routing.module';
import { NestSubCategoryComponent } from './nest-sub-category.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [NestSubCategoryComponent],
  imports: [
    CommonModule,
    NestSubCategoryRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]
})
export class NestSubCategoryModule { }
