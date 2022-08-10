import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersForAdminService } from '../orders-for-admin.service';

@Component({
  selector: 'app-pending-orders-for-admin',
  templateUrl: './pending-orders-for-admin.component.html',
  styleUrls: ['./pending-orders-for-admin.component.css']
})
export class PendingOrdersForAdminComponent implements OnInit {
  
  subscription: Subscription;
  pendingList: any[] = [];
  pendingCount = 0;
  getStyleFromNav: string = null;


  constructor(private _ordersForAdminService: OrdersForAdminService,
    private DialogService: ConfirmationService, private _adminService: AdminService) { }

  ngOnInit(): void {

    this.pendingOrdersList(1);

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });
  }

  pendingOrdersList(pageNo: number) {
    this.subscription = this._ordersForAdminService.getPendingOrders(pageNo).subscribe((data: any) => {
      this.pendingList = data.orderList;
      this.pendingCount = data.dataCount;
    })
  }

  tablePageNoChange(pageNo: number) {
    this.pendingList = [];
    this.pendingOrdersList(pageNo);
  }

  // Deleteing Order
  CancelingOrderByAdmin(dataId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Cancel this completely order and send email to user?',
      accept: () => {
        //  this.showIndicator = true;
        this.subscription = this._ordersForAdminService.CancelOrderAdmin(dataId).subscribe(() => {
          this.tablePageNoChange(1);
          //  this.showIndicator = false;
        })
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
