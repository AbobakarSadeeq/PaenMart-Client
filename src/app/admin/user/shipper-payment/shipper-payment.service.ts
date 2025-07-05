import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipperPaymentService {

  constructor(private _http: HttpClient) { }

  getShippersPayment() {
    return this._http.get(environment.usersApiUrl + "/GetShipperPendingPayment");
  }

  payingShipper(shipperPaymentId: number) {
    return this._http.put(environment.usersApiUrl + "/PayingShipperMonthlyPayment/" + shipperPaymentId, {});
  }

  getPaidShipper() {
    return this._http.get(environment.usersApiUrl + "/PaidShipperList");
  }

  againPayingShipper(shipperPaymentId: number) {
    return this._http.put(environment.usersApiUrl + "/PayingShipperMonthlyPaymentAgainApplying/" + shipperPaymentId, {});
  }

  getAllShipperPaymentHistoryList(pageNo: number) {
    return this._http.get(environment.usersApiUrl + "/ShipperPaymentHistory/" + pageNo);
  }

}
