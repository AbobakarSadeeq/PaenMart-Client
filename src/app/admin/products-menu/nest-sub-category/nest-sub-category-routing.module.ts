import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NestSubCategoryComponent } from './nest-sub-category.component';

const routes: Routes = [
  {path:"", component:NestSubCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NestSubCategoryRoutingModule { }
