import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderService {


  constructor(private _Http: HttpClient) { }

  getOrdersById(dataId: string): Observable<any> {
    return this._Http.get(environment.userOrderApiUrl + "/GetSingleUserOrders/" + dataId);
  }

  deleteOrderCompletebyUser(dataId: number) {
    return this._Http.delete(environment.userOrderApiUrl + "/DeleteOrderByUser/" + dataId);
  }

  trackOrderProductsFetching(data: any) {
    return this._Http.post(environment.userOrderApiUrl + "/OrderTracking", data);
  }

}
