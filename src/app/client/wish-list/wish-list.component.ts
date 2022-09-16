import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { WishListService } from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  subscription: Subscription;
  productWishList: any[] = [];
  constructor(private _wishListSerivce: WishListService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _shoppingCart:ShoppingCartService) { }

  ngOnInit(): void {

    this.getWishListProduct(JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID);
  }

  getWishListProduct(userId: string) {
    this.subscription = this._wishListSerivce.GetSingleUserWishList(userId).subscribe((data: any) => {
      this.productWishList = data;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  RemoveItemFromWishList(data: any) {
    let customObj = {
      productId:data.productId,
      userId:data.userId
    };
    this._wishListSerivce.DeleteProductFromUserWishList(customObj).subscribe((data:any)=>{
      this.getWishListProduct(customObj.userId);
    })
  }

  // Cart Data
  itemsCart: any[] = [];
  addToCartProduct(productData: any) {

    // Making LocalStorage for Cart
    let filteringDataOfProduct = {
      productName: productData.productName,
      quantity: 1,
      price: productData.productPrice,
      imageUrl: productData.productImageUrl,
      productID: productData.productId,
    }


    let cartDataNull = localStorage.getItem("ProductCartData");
    if (cartDataNull == null) {
      let storeDataGet: any[] = [];
      storeDataGet.push(filteringDataOfProduct);
      localStorage.setItem("ProductCartData", JSON.stringify(storeDataGet));

    } else {
      let gettingIdOfProduct = filteringDataOfProduct.productID;
      let index = -1;
      this.itemsCart = JSON.parse(localStorage.getItem("ProductCartData")!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(gettingIdOfProduct) === parseInt(this.itemsCart[i].productID)) {
          this.itemsCart[i].quantity = filteringDataOfProduct.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(filteringDataOfProduct);
        localStorage.setItem("ProductCartData", JSON.stringify(this.itemsCart));

      }
      else {
        localStorage.setItem("ProductCartData", JSON.stringify(this.itemsCart));

      }
    }

    this._shoppingCart.cartItemsNumber.next(JSON.parse(localStorage.getItem("ProductCartData")).length);

  }


}
