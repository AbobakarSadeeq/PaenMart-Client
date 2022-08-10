import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandWithNestCategoryService {

  constructor(private _http:HttpClient) { }

  getListBrandsNestCategories(): Observable<any>{
  return this._http.get("https://localhost:44300/api/ProductBrand/GetAllProductsWithNestSubCategory");
  }


  DeleteData(data:any) {
    // delete does not do delete multiples id and also delete verb does not send data in body
    return this._http.put("https://localhost:44300/api/ProductBrand/DeleteNestSubAndProductBrand",data);
  }

  InsertData(data:any){
    return this._http.post("https://localhost:44300/api/ProductBrand/AddDataToNestSubProductBrand",data);
  }

}
