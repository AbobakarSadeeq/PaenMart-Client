import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipperShipmentOrdersService {

  constructor(private _httpClient: HttpClient) { }

  getShippmentDoneByShipperList(data: any) {
    return this._httpClient.post(environment.userOrderApiUrl + "/ShipperShipmentsDone", data);
  }

}
