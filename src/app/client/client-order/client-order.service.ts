import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {


  constructor(private _Http: HttpClient) { }

  getOrdersById(dataId: string): Observable<any> {
    return this._Http.get("https://localhost:44300/api/UserOrder/GetSingleUserOrders/" + dataId);
  }

  deleteOrderCompletebyUser(dataId: number) {
    return this._Http.delete("https://localhost:44300/api/UserOrder/DeleteOrderByUser/" + dataId);

  }

  trackOrderProductsFetching(data: any) {
    return this._Http.post("https://localhost:44300/api/UserOrder/OrderTracking", data);

  }
}
