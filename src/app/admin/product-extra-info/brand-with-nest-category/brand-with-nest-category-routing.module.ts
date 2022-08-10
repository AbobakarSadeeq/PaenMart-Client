import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandWithNestCategoryComponent } from './brand-with-nest-category.component';

const routes: Routes = [
  {path:"", component:BrandWithNestCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandWithNestCategoryRoutingModule { }
