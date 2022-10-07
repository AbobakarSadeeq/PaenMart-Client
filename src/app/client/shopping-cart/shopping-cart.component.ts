import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription, SubscriptionLike } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductDiscountDealsService } from 'src/app/admin/product-discount-deals/product-discount-deals.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  // Shopping Cart Properties
  addQuantity = 0;
  cartDataList: any[] = [];
  totalPrice: number = 0;
  numberOfItemsInCart: number = 0;


  // Other's Properties
  displayModal = false;
  subscription: SubscriptionLike;
  showIndicator = false;
  showCheckOutButton: boolean = true;

  // User Address Data
  userDetails: any;
  userId: any;
  userAddress: any = true;
  selectAddressTab = null;

  constructor(
    private confirmationService: ConfirmationService,
    private _shoppingCartService: ShoppingCartService,
    private _route: Router,
    private _activateRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _productDealService: ProductDiscountDealsService
  ) { }

  ngOnInit(): void {


    // every time when this component execute or opened then check the localStorage products selected that are in deal or not

    if (localStorage.getItem("ProductCartData")) {
      let userCartProductsArr: any[] = JSON.parse(localStorage.getItem("ProductCartData"));
      let selectedProductsId = [];
      for (var singleSelectedCartProduct of userCartProductsArr) {
        selectedProductsId.push(singleSelectedCartProduct.productID);
      }
      this._productDealService.SelectedProductsInLocalStorage(selectedProductsId).subscribe((data: any) => {
        this.totalPrice = 0;
        let perviousSizeName = [];
        for (var singleProduct of data) {
          var findingProductInLocalStorage = userCartProductsArr.find(a => a.productID == singleProduct.productId && !perviousSizeName.includes(a.productID + a.productSize?.sizeName));
          var findingIndexOfSelectedProduct = userCartProductsArr.findIndex(a => a.productID == singleProduct.productId && !perviousSizeName.includes(a.productID + a.productSize?.sizeName));
          if (singleProduct.productInDeal == false) {
            findingProductInLocalStorage.afterDiscountPrice = 0;
            findingProductInLocalStorage.discountPercentage = 0;

            if (findingProductInLocalStorage.productSize) {

              perviousSizeName.push(findingProductInLocalStorage.productID + findingProductInLocalStorage.productSize.sizeName);

              // this.totalPrice = this.totalPrice + (findingProductInLocalStorage.price * findingProductInLocalStorage.quantity)
            } else {
              // this.totalPrice = this.totalPrice + (findingProductInLocalStorage.price * findingProductInLocalStorage.quantity)

            }


          } else {

            if (!findingProductInLocalStorage.afterDiscountPrice) {

              if (findingProductInLocalStorage.productSize) {
                perviousSizeName.push(findingProductInLocalStorage.productID + findingProductInLocalStorage.productSize.sizeName);

                // this.totalPrice = this.totalPrice + (singleProduct.afterDiscountPrice * findingProductInLocalStorage.quantity)
              } else {
                // this.totalPrice = this.totalPrice + (singleProduct.afterDiscountPrice * findingProductInLocalStorage.quantity)


              }



              userCartProductsArr[findingIndexOfSelectedProduct].discountPercentage = singleProduct.discountPercentage;
              userCartProductsArr[findingIndexOfSelectedProduct].afterDiscountPrice = singleProduct.afterDiscountPrice;
            } else {

              if (findingProductInLocalStorage.productSize) {
                perviousSizeName.push(findingProductInLocalStorage.productID + findingProductInLocalStorage.productSize.sizeName);


                // this.totalPrice = this.totalPrice + (findingProductInLocalStorage.afterDiscountPrice * findingProductInLocalStorage.quantity)

              } else {
                // this.totalPrice = this.totalPrice + (findingProductInLocalStorage.afterDiscountPrice * findingProductInLocalStorage.quantity)

              }
            }



          }
        }
        this.totalPrice = 0;
        localStorage.setItem("ProductCartData", JSON.stringify(userCartProductsArr));
        this.cartDataList = userCartProductsArr;
        for (var cartItem of this.cartDataList) {
          if (cartItem?.afterDiscountPrice > 0) {
            this.totalPrice = this.totalPrice + (cartItem?.afterDiscountPrice * cartItem?.quantity);
          }

          if (cartItem?.afterDiscountPrice == 0) {
            this.totalPrice = this.totalPrice + (cartItem?.price * cartItem?.quantity);
          }
        }

      })
    }

    this.paymentSelect = [
      { url: '../../../assets/payment methods pic/easypaisa.PNG', selected: false, name: 'EasyPaisa' },
      { url: '../../../assets/payment methods pic/JazzCash.PNG', selected: false, name: 'JazzCash' },
      { url: '../../../assets/payment methods pic/HBL.PNG', selected: false, name: 'HBL' },
      { url: '../../../assets/payment methods pic/CashOnDelivery.PNG', selected: false, name: 'CashOnDelivery' },
      { url: '../../../assets/payment methods pic/debitCard.PNG', selected: false, name: 'debitCard' },

    ]
    // Used for when There is no Items inside the cart then dont show the CheckCart Button
    if (localStorage.getItem("ProductCartData") == null) {
      this.showCheckOutButton = false;
    }

    if (localStorage.getItem('token')) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      this.userId = payload.UserID;
    }


    // Calling this method when this component execute
    this.gettingDataOfCart();
    this.allCartPrice();

    this.subscription = this._AuthService.GetLogInProfile({ token: localStorage.getItem('token') }).subscribe((data: any) => {
      this.userDetails = data;
    })


    console.log(this.cartDataList);

  }

  // This will get the
  showModelDialogOfCheckOut() {
    this.displayModal = true;

    if (localStorage.getItem("token") == null) {
      this._route.navigate(["/auth"]);
    }

    // Getting the User Address
    this.displayModal = true;
    //   this.showIndicator = false;
    this.subscription = this._AuthService.GetUserAddress(this.userId).subscribe((data: any) => {
      if (data) {
        this.userAddress = data;
      } else {
        this.userAddress = data;
      }
    });

  }

  // Order Confirm Method and it will send data to the API.



  // Adding the Product Quantity or change or Edit the Quantity
  addingProductQuantity(cartItemData: any) {
    for (var indexArray = 0; indexArray < this.cartDataList.length; indexArray++) {
      if (this.cartDataList[indexArray].productID == cartItemData.productID) {

        this.cartDataList[indexArray].quantity = parseInt(cartItemData.quantity) + 1;
      }
    }
    localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList));
    this.allCartPrice();
    this.cartItemFunc();
  }

  // Subtracting the Product Quantity or change or Edit the Quantity
  subtractingProductQuantity(cartItemData: any) {
    for (var indexArray = 0; indexArray < this.cartDataList.length; indexArray++) {
      if (this.cartDataList[indexArray].productID == cartItemData.productID) {
        this.cartDataList[indexArray].quantity = parseInt(cartItemData.quantity) - 1;
      }
    }
    localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList));
    this.allCartPrice();
    this.cartItemFunc();

  }

  // Geting All Shopping Cart LocalStorage Data
  gettingDataOfCart() {
    let gettingData = JSON.parse(localStorage.getItem("ProductCartData")!);
    if (gettingData) {
      this.cartDataList = gettingData;
    }
  }

  // Total Price of Items inside the Cart
  allCartPrice() {
    let gettingLocalStorageData = JSON.parse(localStorage.getItem("ProductCartData")!);
    if (gettingLocalStorageData) {
      this.cartDataList = gettingLocalStorageData
      this.totalPrice = 0;
      for (var cartItem of this.cartDataList) {

        if (cartItem?.afterDiscountPrice > 0) {
          // product is in sale
          this.totalPrice = this.totalPrice + (cartItem.quantity * cartItem.afterDiscountPrice)
        } else {
          // product is not in sale
          this.totalPrice = this.totalPrice + (cartItem.quantity * cartItem.price);

        }

      }


    }
  }

  // Updating Number of Item in Cart
  cartItemFunc() {
    if (localStorage.getItem('ProductCartData') != null) {
      var cartValue: [] = JSON.parse(localStorage.getItem('ProductCartData')!);
      let quantitySum: number = 0;
      for (var gettingQuantity of cartValue) {
        quantitySum = quantitySum + gettingQuantity['quantity'];
      }
      this._shoppingCartService.cartItemsNumber.next(quantitySum);
    }
  }

  // Remove Item from Cart
  orderBtn = true;
  RemoveItemFromCart(productID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete the item from Cart?',
      accept: () => {
        let gettingData = JSON.parse(localStorage.getItem("ProductCartData")!);
        if (localStorage.getItem("ProductCartData")) {
          this.cartDataList = gettingData;
          const findingIdInCartArray = this.cartDataList.findIndex(a => a.productID == productID);
          this.cartDataList.splice(findingIdInCartArray, 1);
          localStorage.setItem("ProductCartData", JSON.stringify(this.cartDataList)); //when Data is deleted then again or replace or set that ArrayList all data in the LocalStorage
          this.allCartPrice();
        }
        if (this.cartDataList.length == 0) {
          this.showCheckOutButton = false;
          localStorage.removeItem("ProductCartData");
          this._shoppingCartService.cartItemsNumber.next(0);
          this.orderBtn = false;
        } else {
          this.cartItemFunc();
        }


      }
    });

  }


  // payment method select

  paymentSelect: any[] = [];
  paymentSelected = true;
  selectPaymentIndexValue = 0;
  onSelectPayment(selectPaymentIndex: number) {
    this.selectPaymentIndexValue = selectPaymentIndex;
    if (this.paymentSelect[selectPaymentIndex].name == "CashOnDelivery") {
      this.paymentSelect[selectPaymentIndex].selected = !this.paymentSelect[selectPaymentIndex].selected;
      this.paymentSelected = !this.paymentSelected;
    } else {
      return;
    }

  }


  // Sending User Order




  orderMessage: any = null;
  sendUserOrder() {
    // this.showIndicator = true;
    let getDataFromOrderDetailLocalStorage = JSON.parse(localStorage.getItem("ProductCartData")!);
    let convertDataFromLocalStorage = getDataFromOrderDetailLocalStorage;
    let storeCustomOrderDetailData: any[] = [];
    debugger;
    for (let orderData of convertDataFromLocalStorage) {
      storeCustomOrderDetailData.push(
        {
          productId: orderData?.productID,
          price: orderData.price,
          quantity: orderData.quantity,
          productName: orderData.productName,
          productSize: orderData.productSize ? orderData?.productSize?.sizeName : "",
          paymentMethod: 'Cash on delivery',
          afterDiscountPrice: orderData.afterDiscountPrice,
          discountPercentage: orderData.discountPercentage,
          // User Address
          fullName: this.userDetails?.fullName,
          userEmail: this.userDetails?.email,
          userAddress: this.userAddress?.completeAddress,
          phoneNumber: this.userAddress?.phoneNumber

        }
      )
    }

    this.subscription = this._shoppingCartService.sendOrder(this.userDetails.id, storeCustomOrderDetailData).subscribe((data: any) => {
      //    this.showIndicator = false;
      this.displayModal = false;
      //  this.orderMessage = data;
      localStorage.removeItem("ProductCartData");
      this._route.navigate(["/"]);
      this.showCheckOutButton = false;

      this.paymentSelect[this.selectPaymentIndexValue].selected = !this.paymentSelect[this.selectPaymentIndexValue].selected;
      this.paymentSelected = !this.paymentSelected;


    }, (orderError: HttpErrorResponse) => {
      this.orderMessage = orderError.error;
      console.log(orderError);
      //   this.showIndicator = false;
    });

  }




  removeMessage() {
    this.orderMessage = null;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //  this.subscription.unsubscribe();
  }




}


