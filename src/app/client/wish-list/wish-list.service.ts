import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _http: HttpClient) { }

  AddProductToWishList(data: any) {
    return this._http.post("https://localhost:44300/api/ProductWishList", data);
  }

  ProductInWishListByUserAvail(data:any){
    return this._http.post("https://localhost:44300/api/ProductWishList/IsProductInWishListUser", data);
  }

  DeleteProductFromUserWishList(data: any) {
    return this._http.post("https://localhost:44300/api/ProductWishList/DeleteSelectedProductFromUserWishlist", data);
  }

  GetSingleUserWishList(userId:string){
    return this._http.get("https://localhost:44300/api/ProductWishList/" + userId);
  }

}
