import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersForAdminService } from '../orders-for-admin.service';

@Component({
  selector: 'app-shipped-orders-for-admin',
  templateUrl: './shipped-orders-for-admin.component.html',
  styleUrls: ['./shipped-orders-for-admin.component.css']
})
export class ShippedOrdersForAdminComponent implements OnInit {

  subscription: Subscription;
  shippedList: any[] = [];
  shippedCount = 0;
  getStyleFromNav: string = null;


  constructor(private _ordersForAdminService: OrdersForAdminService,
    private DialogService: ConfirmationService, private _adminService: AdminService) { }

  ngOnInit(): void {

    this.shippedOrdersList(1);

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });
  }

  shippedOrdersList(pageNo: number) {
    this.subscription = this._ordersForAdminService.getShippedOrders(pageNo).subscribe((data: any) => {
      this.shippedList = data.orderList;
      console.log(data);
      this.shippedCount = data.dataCount;
    })
  }

  tablePageNoChange(pageNo: number) {
    this.shippedList = [];
    this.shippedOrdersList(pageNo);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}



