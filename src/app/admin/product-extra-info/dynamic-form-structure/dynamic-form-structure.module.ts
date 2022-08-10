import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormStructureRoutingModule } from './dynamic-form-structure-routing.module';
import { DynamicFormStructureComponent } from './dynamic-form-structure.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [DynamicFormStructureComponent],
  imports: [
    CommonModule,
    DynamicFormStructureRoutingModule,
    SharedModule,
    AdminHeaderModule,

  ],
  providers:[ConfirmationService]
})
export class DynamicFormStructureModule { }
