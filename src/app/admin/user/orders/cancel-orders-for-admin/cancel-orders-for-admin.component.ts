import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersForAdminService } from '../orders-for-admin.service';

@Component({
  selector: 'app-cancel-orders-for-admin',
  templateUrl: './cancel-orders-for-admin.component.html',
  styleUrls: ['./cancel-orders-for-admin.component.css']
})
export class CancelOrdersForAdminComponent implements OnInit {

  subscription: Subscription;
  cancelList: any[] = [];
  cancelCount = 0;
  getStyleFromNav: string = null;


  constructor(private _ordersForAdminService: OrdersForAdminService,
    private DialogService: ConfirmationService, private _adminService: AdminService) { }

  ngOnInit(): void {

    this.cancelOrdersList(1);

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });
  }

  cancelOrdersList(pageNo: number) {
    this.subscription = this._ordersForAdminService.getCancelOrders(pageNo).subscribe((data: any) => {
      this.cancelList = data.orderList;
      this.cancelCount = data.dataCount;
    })
  }

  tablePageNoChange(pageNo: number) {
    this.cancelList = [];
    this.cancelOrdersList(pageNo);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
