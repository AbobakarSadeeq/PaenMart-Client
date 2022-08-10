import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipperPaymentService {

  constructor(private _http: HttpClient) { }

  getShippersPayment() {
    return this._http.get("https://localhost:44300/api/Users/GetShipperPendingPayment");
  }

  payingShipper(shipperPaymentId: number) {
    return this._http.put("https://localhost:44300/api/Users/PayingShipperMonthlyPayment/" + shipperPaymentId, {});
  }

  getPaidShipper() {
    return this._http.get("https://localhost:44300/api/Users/PaidShipperList");
  }

  againPayingShipper(shipperPaymentId: number) {
    return this._http.put("https://localhost:44300/api/Users/PayingShipperMonthlyPaymentAgainApplying/" + shipperPaymentId, {});
  }

  getAllShipperPaymentHistoryList(pageNo: number) {
    return this._http.get("https://localhost:44300/api/Users/ShipperPaymentHistory/" + pageNo);
  }
}
