import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSendingInfoComponent } from './email-sending-info.component';

const routes: Routes = [
  { path: "", component: EmailSendingInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSendingInfoRoutingModule { }
