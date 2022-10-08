import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OrderDetailsService } from './order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  subscription: Subscription;
  userOrderDetailData: any;
  totalPriceSingleOrder = 0;
  myOrderStatus = "";
  shipperDetail: any;

  constructor(private confirmationService: ConfirmationService,
    private _activeRoute: ActivatedRoute,
    private _route: Router, private _authService: AuthService,
    private _userOrdersDetails: OrderDetailsService) { }

  ngOnInit(): void {

    const getOrderId = this._activeRoute.snapshot.params['id'];
    this.getOrderDetailsData(getOrderId);

    const orderStatus = this._activeRoute.snapshot.queryParamMap.get('orderStatus');
    this.myOrderStatus = orderStatus;
    if (orderStatus == "Shipped" || orderStatus == "Shipped order by shipper") {
      setTimeout(() => {
        this.subscription = this._userOrdersDetails.getShipperDetail(this.userOrderDetailData?.shipperId).subscribe((data: any) => {
          this.shipperDetail = data;
        });
      }, 1000)
    }





  }


  getOrderDetailsData(paramId: number) {
    this.subscription = this._userOrdersDetails.getOrderDetails(paramId).subscribe((data: any) => {
      this.userOrderDetailData = data;
      for (var cartItem of data.orderDetail) {
        this.totalPriceSingleOrder = this.totalPriceSingleOrder + (cartItem.quantity * cartItem.price);
      }
    });

  }


  confirmOrder(data: any) {


    if (this.myOrderStatus == 'Shipping pending for shipper') {
      // shipper accepting the order and shipment
      var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      let sipperFilterData = {
        orderId: data.orderId,
        shipperUserId: payload.UserID,
        OrderTotalPrice: this.totalPriceSingleOrder,
        orderDetails: data.orderDetail,
        email: data.email,
        completeAddress: data.completeAddress,
        phoneNumber: data.phoneNumber,
        fullName: data.fullName
      }

      this.confirmationService.confirm({
        message: 'Are you sure you want to Confirm this Shipment?',
        accept: () => {
          // this.showIndicator = true;
          this.subscription = this._userOrdersDetails.shipperShipOrderDone(sipperFilterData).subscribe(() => {
            //    this.showIndicator = false;
            this._route.navigate(['/Admin/Shipper/ShipperPendingOrders']);
            //   this._userOrders.orderConfirmMessage.next("Order has been confirm and shipped");
          })
        }
      });


    } else {
      this.confirmationService.confirm({
        message: 'Are you sure you want to Confirm this Order?',
        accept: () => {

          this.subscription = this._userOrdersDetails.acceptOrder(data).subscribe((productsHavingSizeAndQuantityList: any) => {
            if (productsHavingSizeAndQuantityList) {
              // it means if order is having Product size products then this block will be execute
              var updateProductDetailsData = [];
             // let perviousSizeName = [];
              for (var singleProduct of productsHavingSizeAndQuantityList) {
                var findingProductById = data?.orderDetail?.find(a => a.productId == singleProduct.productID);
                var findingIndexOfOrderDetail = data?.orderDetail?.findIndex(a => a.productId == singleProduct.productID)

                let convertJsonStringToJsonObj = JSON.parse(singleProduct.productDetails);
                let convertJsonObjToJsObj = JSON.parse(convertJsonStringToJsonObj);
                let index = convertJsonObjToJsObj?.productSize?.findIndex(a => a.sizeName == findingProductById.productSize);
                let subtractingSelectedSize = parseInt(convertJsonObjToJsObj.productSize[index].sizeQuantity) - findingProductById.quantity;
                convertJsonObjToJsObj.productSize[index].sizeQuantity = subtractingSelectedSize.toString();

                // merging object if two ids same
                let findingSameProductIdIndex = updateProductDetailsData.findIndex(a=>a.productId == singleProduct.productID);
                if(findingSameProductIdIndex == -1){
                  updateProductDetailsData.push({ productId: singleProduct.productID, productDetails: convertJsonObjToJsObj });

                }else {
                  // if id is founnded in updateProductDetailData then find the selectedSize
                  let findingSelectedSizeIndex = updateProductDetailsData[findingSameProductIdIndex]?.productDetails?.productSize.findIndex(a=>a.sizeName == findingProductById.productSize);
                  updateProductDetailsData[findingSameProductIdIndex].productDetails.productSize[findingSelectedSizeIndex].sizeQuantity = subtractingSelectedSize.toString();
                }
                data?.orderDetail?.splice(findingIndexOfOrderDetail, 1);

              }

              for(var updateProductIndex in updateProductDetailsData){
                let newConvertConvertJsArrToJson = JSON.stringify(updateProductDetailsData[updateProductIndex].productDetails);
                let newConvertJsonObjToJsonString = JSON.stringify(newConvertConvertJsArrToJson);
                updateProductDetailsData[updateProductIndex].productDetails = newConvertJsonObjToJsonString;

              }

              this._userOrdersDetails.updateProductSizeQuantity(updateProductDetailsData).subscribe(() => {

              });
            }

            this._route.navigate(['/Admin/PendingUserOrders']);
          })
        }
      });
    }


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
