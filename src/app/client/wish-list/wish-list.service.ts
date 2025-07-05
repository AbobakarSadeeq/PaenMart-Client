import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _http: HttpClient) { }

  AddProductToWishList(data: any) {
    return this._http.post(environment.productWishListApiUrl, data);
  }

  ProductInWishListByUserAvail(data: any) {
    return this._http.post(environment.productWishListApiUrl + "/IsProductInWishListUser", data);
  }

  DeleteProductFromUserWishList(data: any) {
    return this._http.post(environment.productWishListApiUrl + "/DeleteSelectedProductFromUserWishlist", data);
  }

  GetSingleUserWishList(userId: string) {
    return this._http.get(environment.productWishListApiUrl + "/" + userId);
  }


}
