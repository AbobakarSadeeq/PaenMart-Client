import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersForAdminService {

  constructor(private _httpClient: HttpClient) { }

  getPendingOrders(pageNo: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/GetPendingOrderList/" + pageNo);
  }

  CancelOrderAdmin(Id: number) {
    return this._httpClient.delete(environment.userOrderApiUrl + "/" + Id);
  }

  getCancelOrders(pageNo: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/GetCancelOrderList/" + pageNo);
  }

  getShippingPendingOrders(pageNo: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/GetShippingPendingList/" + pageNo);
  }

  getShippedOrders(pageNo: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/GetShippedOrderList/" + pageNo);
  }


}
