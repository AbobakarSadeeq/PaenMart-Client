import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientProductService {

  constructor(private _Http: HttpClient) { }

  get(Id: any) {
    return this._Http.get(environment.productApiUrl + "/" + Id);
  }

  // get brands by single selected nest category
  getBrands(Id: number) {
    return this._Http.get(environment.productBrandApiUrl + "/GetAllProductBrandByNestSubCategory/" + Id);
  }

  getProductsByCategory(selectedObj: any) {
    return this._Http.get(environment.productApiUrl + "/GetProductsByNestSubCategory/", {
      params: {
        nestCategoryId: selectedObj.nestCategoryId,
        pageSelectedNo: selectedObj.pageSelectedNo,
        singleCategoryTotalProductsCount: 0
      }
    });
  }

  getProductsByBrands(selectedObj: any) {
    return this._Http.get(environment.productApiUrl + "/GetProductsByBrand", {
      params: {
        nestCategoryId: selectedObj.nestCategoryId,
        pageSelectedNo: selectedObj.pageSelectedNo,
        singleCategoryTotalProductsCount: 0,
        brandId: selectedObj.brandId
      }
    });
  }

}
