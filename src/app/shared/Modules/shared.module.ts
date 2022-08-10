import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import { BasicModule } from './basic/basic.module';
import { MaterialModule } from './material/material.module';
import { PrimengModule } from './primeng/primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HasRoleDirective } from '../directive-role/has-role.directive';

@NgModule({
  declarations:[HasRoleDirective],
  imports: [
    NgbModule
  ],
  exports: [
    PrimengModule,
    MaterialModule,
    BasicModule,
    NgbModule,
    HasRoleDirective
  ]
})
export class SharedModule { }
