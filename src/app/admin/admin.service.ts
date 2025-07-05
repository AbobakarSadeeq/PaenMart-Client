import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  sideBar: any = new Subject<string>();
  userData: any = new Subject<string>();



  constructor(private _Http: HttpClient) { }

  chartMonthData(): Observable<any> {
    return this._Http.get(environment.extraFeaturesApiUrl + "/OrdersChart");
  }

  getDashboardData() {
    return this._Http.get(environment.extraFeaturesApiUrl + "/DashboardData");
  }

  getLastFiveShippedOrders(): Observable<any> {
    return this._Http.get(environment.extraFeaturesApiUrl + "/GetLastFiveShippedOrders");
  }

}
