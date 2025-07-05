import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private _httpClient: HttpClient) { }

  getOrderDetails(Id: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/OrderDetails/" + Id);
  }

  acceptOrder(orderData: any) {
    return this._httpClient.put(environment.userOrderApiUrl + "/AcceptOrder", orderData);
  }

  getShipperDetail(shipperId: number) {
    return this._httpClient.get(environment.userOrderApiUrl + "/ShipperDetail/" + shipperId);
  }

  shipperShipOrderDone(data: any) {
    return this._httpClient.post(environment.userOrderApiUrl + "/ShippmentOrderDone", data);
  }

  updateProductSizeQuantity(data: any) {
    return this._httpClient.put(environment.userOrderApiUrl + "/ProductSizeQuantityChanging", data);
  }


}
