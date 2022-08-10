import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersForAdminService } from '../../orders-for-admin.service';

@Component({
  selector: 'app-shipping-pending-orders-for-shipper',
  templateUrl: './shipping-pending-orders-for-shipper.component.html',
  styleUrls: ['./shipping-pending-orders-for-shipper.component.css']
})
export class ShippingPendingOrdersForShipperComponent implements OnInit {

  subscription: Subscription;
  shippingPendingList: any[] = [];
  shippingPendingCount = 0;
  getStyleFromNav: string = null;
  shipperShowOrders = false;

  constructor(private _ordersForAdminService: OrdersForAdminService,
    private DialogService: ConfirmationService, private _adminService: AdminService) { }

  ngOnInit(): void {

    this.shippingPendingOrdersList(1);

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    // if (localStorage.getItem('token')) {
    //   var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    //   if (payload.role == 'Shipper') {
    //     this.shipperShowOrders = true;
    //   }
    // }

  }

  shippingPendingOrdersList(pageNo: number) {
    this.subscription = this._ordersForAdminService.getShippingPendingOrders(pageNo).subscribe((data: any) => {
      this.shippingPendingList = data.orderList;
      this.shippingPendingCount = data.dataCount;
    })
  }

  tablePageNoChange(pageNo: number) {
    this.shippingPendingList = [];
    this.shippingPendingOrdersList(pageNo);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
