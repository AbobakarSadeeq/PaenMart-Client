import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDiscountDealsService {

  constructor(private _httpClient: HttpClient) { }

  getSelectedNestCategoryProductList(selectedNestId: number): Observable<any> {
    return this._httpClient.get("https://localhost:44300/api/ProductDiscountDeals/" + selectedNestId);
  }

  getLiveDiscountDeals(): Observable<any> {
    return this._httpClient.get("https://localhost:44300/api/ProductDiscountDeals");
  }


  AddProductsDiscountDeal(productsDealObj: any) {
    return this._httpClient.post("https://localhost:44300/api/ProductDiscountDeals", productsDealObj);
  }

  DeleteDiscountDeal(selectedId: number) {
    return this._httpClient.delete("https://localhost:44300/api/ProductDiscountDeals/" + selectedId);
  }

  getSingleDealProducts(id: number) {
    return this._httpClient.get("https://localhost:44300/api/ProductDiscountDeals/SelectedDealProductsDetail/" + id);
  }

  updateSingleDealProducts(data: any) {
    return this._httpClient.put("https://localhost:44300/api/ProductDiscountDeals", data);

  }


}
