import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientProductService {

  constructor(private _Http: HttpClient) { }

  get(Id: any) {
    return this._Http.get("https://localhost:44300/api/Product" + '/' + Id);
  }

  // get brands by single selected nest category
  getBrands(Id: number) {
    return this._Http.get("https://localhost:44300/api/ProductBrand/GetAllProductBrandByNestSubCategory/" + Id);
  }

  getProductsByCategory(selectedObj: any) {
    return this._Http.get("https://localhost:44300/api/Product/GetProductsByNestSubCategory/",
    {
      params: {
        nestCategoryId: selectedObj.nestCategoryId,
        pageSelectedNo: selectedObj.pageSelectedNo,
        singleCategoryTotalProductsCount:0
      }
    });
  }

  getProductsByBrands(selectedObj: any) {
    return this._Http.get("https://localhost:44300/api/Product/GetProductsByBrand",
      {
        params: {
          nestCategoryId: selectedObj.nestCategoryId,
          pageSelectedNo: selectedObj.pageSelectedNo,
          singleCategoryTotalProductsCount:0,
          brandId:selectedObj.brandId
        }
      });
  }
}
