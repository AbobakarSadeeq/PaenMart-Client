import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    AdminHeaderModule,
    SharedModule
  ],
  providers:[ConfirmationService]

})
export class CategoryModule { }
