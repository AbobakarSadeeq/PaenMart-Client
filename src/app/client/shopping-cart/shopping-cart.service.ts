import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItemsNumber = new Subject<number>();

  constructor(private _Http: HttpClient) { }

  // Order Sending Data From User
  
  sendOrder(userId: string, orderData: any) {
    return this._Http.post(environment.userOrderApiUrl + "/" + userId, orderData);
  }


}
