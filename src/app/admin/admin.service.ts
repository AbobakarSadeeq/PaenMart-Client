import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  sideBar: any = new Subject<string>();
  userData: any = new Subject<string>();



  constructor(private _Http: HttpClient) { }

  chartMonthData(): Observable<any> {
    return this._Http.get("https://localhost:44300/api/ExtraFeatures/OrdersChart")
  }

  getDashboardData() {
    return this._Http.get("https://localhost:44300/api/ExtraFeatures/DashboardData")
  }

  getLastFiveShippedOrders(): Observable<any> {
    return this._Http.get("https://localhost:44300/api/ExtraFeatures/GetLastFiveShippedOrders")

  }
}
