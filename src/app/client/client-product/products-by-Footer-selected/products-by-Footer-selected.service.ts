import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsByBrandService {

  constructor(private http: HttpClient) { }

  GetAll(data: any): Observable<any> {
    return this.http.post("https://localhost:44300/api/ExtraFeatures/ShopByBrandForFooter", data);
  }

  GetAllBrands(): Observable<any> {
    return this.http.get("https://localhost:44300/api/ExtraFeatures/GetBrandsForFooter");
  }

  GetAllNestCategories(): Observable<any> {
    return this.http.get("https://localhost:44300/api/ExtraFeatures/GetNestCategoriesForFooter");
  }

  getProductsByNestCategory(selectedObj: any) {
    return this.http.get("https://localhost:44300/api/Product/GetProductsByNestSubCategory/",
    {
      params: {
        nestCategoryId: selectedObj.nestCategoryId,
        pageSelectedNo: selectedObj.pageSelectedNo,
        singleCategoryTotalProductsCount:0
      }
    });
  }
}
