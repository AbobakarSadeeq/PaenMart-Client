import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersForAdminService {

  constructor(private _httpClient: HttpClient) { }

  getPendingOrders(pageNo: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/GetPendingOrderList/" + pageNo);
  }

  CancelOrderAdmin(Id: number) {
    return this._httpClient.delete("https://localhost:44300/api/UserOrder/" + Id);
  }

  getCancelOrders(pageNo: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/GetCancelOrderList/" + pageNo);
  }

  getShippingPendingOrders(pageNo: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/GetShippingPendingList/" + pageNo);
  }

  getShippedOrders(pageNo: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/GetShippedOrderList/" + pageNo);

  }

}
