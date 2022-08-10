import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends CrudService {

  constructor(http:HttpClient, private forCustomApisHttp:HttpClient ) {
    super(environment.urlSubCategory, http);
   }

   // Get sub-categories by category-Id
   GetSubCategoriesByCategoryId(categoryId:number): Observable<any> {
    return this.forCustomApisHttp.get(environment.urlSubCategory + "/" + categoryId);
  }

  GetSingleSubCategoryById(subCategoryId:number) {
    return this.forCustomApisHttp.get(environment.urlSubCategory + "/GetSingleSubCategory/"  + subCategoryId);
  }
}
