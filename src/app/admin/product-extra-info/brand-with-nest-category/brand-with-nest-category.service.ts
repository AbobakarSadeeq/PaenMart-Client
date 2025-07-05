import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandWithNestCategoryService {

  constructor(private _http: HttpClient) { }

  getListBrandsNestCategories(): Observable<any> {
    return this._http.get(environment.productBrandApiUrl + "/GetAllProductsWithNestSubCategory");
  }


  DeleteData(data: any) {
    // delete does not do delete multiples id and also delete verb does not send data in body
    return this._http.put(environment.productBrandApiUrl + "/DeleteNestSubAndProductBrand", data);
  }

  InsertData(data: any) {
    return this._http.post(environment.productBrandApiUrl + "/AddDataToNestSubProductBrand", data);
  }

}
