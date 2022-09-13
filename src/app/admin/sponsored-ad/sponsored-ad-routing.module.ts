import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsoredAdComponent } from './sponsored-ad.component';

const routes: Routes = [
  { path: "", component: SponsoredAdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsoredAdRoutingModule { }
