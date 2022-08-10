import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipperShipmentOrdersService {

  constructor(private _httpClient: HttpClient) { }

  getShippmentDoneByShipperList(data: any) {
    return this._httpClient.post("https://localhost:44300/api/UserOrder/ShipperShipmentsDone", data);

  }


}
