import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSendingInfoRoutingModule } from './email-sending-info-routing.module';
import { EmailSendingInfoComponent } from './email-sending-info.component';
import { SharedModule } from 'src/app/shared/Modules/shared.module';
import { AdminHeaderModule } from '../../admin-header/admin-header.module';


@NgModule({
  declarations: [EmailSendingInfoComponent],
  imports: [
    CommonModule,
    EmailSendingInfoRoutingModule,
    SharedModule,
    AdminHeaderModule
  ]
})
export class EmailSendingInfoModule { }
