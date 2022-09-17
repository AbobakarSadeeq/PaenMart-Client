import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SponsoredAdService } from 'src/app/admin/sponsored-ad/sponsored-ad.service';
import { ClientOrderReviewService } from '../../client-order-review/client-order-review.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { WishListService } from '../../wish-list/wish-list.service';
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
  singleProductReviews: any[] = [];
  sideMixProductsPage: any;
  sideProductDetailPage: any;
  constructor(private _clientProduct: ClientProductService,
    private _activateRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService,
    private _clientProductOrderReviewService: ClientOrderReviewService,
    private _sponsoreAd: SponsoredAdService,
    private _productWishList: WishListService,
    private _route: Router
  ) { }

  ngOnInit(): void {


    // wish list
    if (localStorage.getItem("token")) {
      let customObj = {
        userId: JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID,
        productId: this._activateRoute.snapshot.params['id']
      };
      this.subscription = this._productWishList.ProductInWishListByUserAvail(customObj).subscribe((data: any) => {
        if (data) {
          this.WishListProductAdded = true;
        }
      });
    }
    // ad
    this.subscription = this._sponsoreAd.getAdByPageName("ProductDetailPage").subscribe((data: any) => {
      this.sideProductDetailPage = data;
    })

    // ad
    this.subscription = this._sponsoreAd.getAdByPageName("MixProductsPage").subscribe((data: any) => {
      this.sideMixProductsPage = data;
    })


    let selectedProductId = this._activateRoute.snapshot.params['id'];
    let productDetailsJsonData = {}
    this.subscription = this._clientProduct.get(selectedProductId).subscribe((data: any) => {
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

    this.reviewList({ pageNo: 1, productId: selectedProductId });

  }
  // reivew list
  reviewList(data: any) {
    this.subscription = this._clientProductOrderReviewService.getSingleProductAllReviews({ pageNo: data.pageNo, productId: data.productId }).subscribe((data: any) => {
      this.singleProductReviews = data.reviewList;
      this.reviewsCount = data.dataCount;
      console.log(data);

    });
  }

  reviewsCount = 0;
  tablePageNoChange(pageNo: number) {
    this.reviewList({ pageNo: pageNo, productId: this._activateRoute.snapshot.params['id'] })
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

  WishListProductAdded = false;
  ProductToWishListHandler() {

    // wish list
    if (!localStorage.getItem("token")) {
      this._route.navigate(["/Auth"]);
    }



    let customObj = {
      userId: JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID,
      productId: this._activateRoute.snapshot.params['id']
    };
    if (this.WishListProductAdded) {
      // remove
      this._productWishList.DeleteProductFromUserWishList(customObj).subscribe((responseData: any) => {
        this.WishListProductAdded = false;
      });

    } else {
      // if product is not in wishlist then add it
      this._productWishList.AddProductToWishList(customObj).subscribe((responseData: any) => {
        this.WishListProductAdded = true;
      });
    }
  }


  navigation(){
    this._route.navigate(['/contact-us']);
  }

  shoppingCartNavigation(productData:any){
    this.addToCartProduct(productData);
    this._route.navigate(['/Cart']);
  }





  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
