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
          console.log(data);
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
        OrderTotalPrice: this.totalPriceSingleOrder
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
          // this.showIndicator = true;
          this.subscription = this._userOrdersDetails.acceptOrder(data).subscribe(() => {
            //    this.showIndicator = false;
            this._route.navigate(['/Admin/PendingUserOrders']);
            //   this._userOrders.orderConfirmMessage.next("Order has been confirm and shipped");
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
