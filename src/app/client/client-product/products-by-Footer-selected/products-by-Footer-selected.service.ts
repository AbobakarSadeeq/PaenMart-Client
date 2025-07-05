import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsByBrandService {

  constructor(private http: HttpClient) { }

  GetAll(data: any): Observable<any> {
    return this.http.post(environment.extraFeaturesApiUrl + "/ShopByBrandForFooter", data);
  }

  GetAllBrands(): Observable<any> {
    return this.http.get(environment.extraFeaturesApiUrl + "/GetBrandsForFooter");
  }

  GetAllNestCategories(): Observable<any> {
    return this.http.get(environment.extraFeaturesApiUrl + "/GetNestCategoriesForFooter");
  }

  getProductsByNestCategory(selectedObj: any) {
    return this.http.get(environment.productApiUrl + "/GetProductsByNestSubCategory/", {
      params: {
        nestCategoryId: selectedObj.nestCategoryId,
        pageSelectedNo: selectedObj.pageSelectedNo,
        singleCategoryTotalProductsCount: 0
      }
    });
  }

}
