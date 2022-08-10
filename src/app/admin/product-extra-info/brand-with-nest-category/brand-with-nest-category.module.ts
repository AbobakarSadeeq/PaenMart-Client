import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandWithNestCategoryRoutingModule } from './brand-with-nest-category-routing.module';
import { BrandWithNestCategoryComponent } from './brand-with-nest-category.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { AdminHeaderComponent } from '../../admin-header/admin-header.component';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [BrandWithNestCategoryComponent],
  imports: [
    CommonModule,
    BrandWithNestCategoryRoutingModule,
    SharedModule,
    AdminHeaderModule,

  ],
  providers:[ConfirmationService]
})
export class BrandWithNestCategoryModule { }
