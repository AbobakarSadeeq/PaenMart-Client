import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedImagesComponent } from './authorized-images.component';

const routes: Routes = [
  {path:"", component:AuthorizedImagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizedImagesRoutingModule { }
