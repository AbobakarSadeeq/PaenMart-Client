import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { ClientProductService } from '../client-product.service';

@Component({
  selector: 'app-client-product-detail',
  templateUrl: './client-product-detail.component.html',
  styleUrls: ['./client-product-detail.component.css']
})
export class ClientProductDetailComponent implements OnInit {

  subscription: Subscription;


  productDetails: any;
  productSpecificationDetails: any[] = [];
  addQuantity = 1;

  constructor(private _clientProduct: ClientProductService,
    private _activateRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {

    let selectedId = this._activateRoute.snapshot.params['id'];
    let productDetailsJsonData = {}
    this.subscription = this._clientProduct.get(selectedId).subscribe((data: any) => {
      setTimeout(() => {
        let convertJsonStringToJsonObj = JSON.parse(data.productDetails);
        let convertJsonObjToJsObj = JSON.parse(convertJsonStringToJsonObj);
        productDetailsJsonData = convertJsonObjToJsObj;
        for (const [key, value] of Object.entries(convertJsonObjToJsObj)) {
          if (key == 'productSize') {
            this.productSpecificationDetails.push({ objectKey: "Product size", objectValue: value });
          } else {
            if (value.constructor === Array && key != "productSize") {
              let custom: any = value;
              let filterDataOfCheckBox = [];
              for (var checkedProductSize of custom) {
                if (checkedProductSize.check == true) {
                  filterDataOfCheckBox.push(" " + checkedProductSize.checkBoxValue)

                }
              }
              this.productSpecificationDetails.push({ objectKey: key, objectValue: filterDataOfCheckBox });

            } else {
              this.productSpecificationDetails.push({ objectKey: key, objectValue: value });

            }
          }
        }

      }, 1000);

      this.productDetails = data;
    });






  }

  addingProductQuantity() {
    this.addQuantity++;
  }

  subtractingProductQuantity() {
    this.addQuantity--;
  }

  // Adding Product to cart


  cartNumberFunc() {
    var cartValue: [] = JSON.parse(localStorage.getItem('ProductCartData')!);
    let quantitySum: number = 0;
    for (var gettingQuantity of cartValue) {
      quantitySum = quantitySum + gettingQuantity['quantity'];
    }
    this._shoppingCartService.cartItemsNumber.next(quantitySum);

  }
  // Cart Data
  itemsCart: any[] = [];
  addToCartProduct(productData: any) {

    // Making LocalStorage for Cart

    let filteringDataOfProduct = {
      productName: productData.productName,
      color: productData.color,
      quantity: this.addQuantity,
      price: productData.price,
      imageUrl: productData.getProductImagess[0].url,
      productID: productData.productID,
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
    this.cartNumberFunc();


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
