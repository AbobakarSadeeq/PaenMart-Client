import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDiscountDealsService {
  expirationUpdate = new Subject<boolean>();

  constructor(private _httpClient: HttpClient) { }

  getSelectedNestCategoryProductList(selectedNestId: number): Observable<any> {
    return this._httpClient.get(environment.productDiscountDealsApiUrl + selectedNestId);
  }

  getLiveDiscountDeals(): Observable<any> {
    return this._httpClient.get(environment.productDiscountDealsApiUrl);
  }

  AddProductsDiscountDeal(productsDealObj: any) {
    return this._httpClient.post(environment.productDiscountDealsApiUrl, productsDealObj);
  }

  DeleteDiscountDeal(selectedId: number) {
    return this._httpClient.delete(environment.productDiscountDealsApiUrl + selectedId);
  }

  getSingleDealProducts(id: number) {
    return this._httpClient.get(environment.productDiscountDealsApiUrl + "/SelectedDealProductsDetail/" + id);
  }

  updateSingleDealProducts(data: any) {
    return this._httpClient.put(environment.productDiscountDealsApiUrl, data);
  }

  GetListExpireDiscountDeal() {
    return this._httpClient.get(environment.productDiscountDealsApiUrl + "/GetExpireDiscountDeal");
  }

  GetListForExpirationDiscountDeal() {
    return this._httpClient.get(environment.productDiscountDealsApiUrl + "/GetLiveDiscountDealForCheckingExpiration");
  }

  ExpiringPostDiscountDeal(id) {
    return this._httpClient.get(environment.productDiscountDealsApiUrl + "/ExpiringDiscountDeal/" + id);
  }

  SelectedProductsInLocalStorage(ids: number[]) {
    return this._httpClient.post(environment.productDiscountDealsApiUrl + "/SelectedLocalStorageProducts/", ids);
  }


}
