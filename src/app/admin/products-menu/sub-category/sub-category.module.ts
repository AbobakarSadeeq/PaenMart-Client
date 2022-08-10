import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category.component';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from 'src/app/shared/Modules/shared.module';


@NgModule({
  declarations: [SubCategoryComponent],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    AdminHeaderModule,
    SharedModule

  ],
  providers:[ConfirmationService]

})
export class SubCategoryModule { }
