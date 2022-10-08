import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private _httpClient: HttpClient) { }

  getOrderDetails(Id: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/OrderDetails/" + Id);
  }

  acceptOrder(orderData: any) {
    return this._httpClient.put("https://localhost:44300/api/UserOrder/AcceptOrder", orderData);
  }

  getShipperDetail(shipperId: number) {
    return this._httpClient.get("https://localhost:44300/api/UserOrder/ShipperDetail/" + shipperId);

  }

  shipperShipOrderDone(data: any) {
    return this._httpClient.post("https://localhost:44300/api/UserOrder/ShippmentOrderDone", data);
  }

  updateProductSizeQuantity(data:any){
    return this._httpClient.put("https://localhost:44300/api/UserOrder/ProductSizeQuantityChanging", data);

  }

}
