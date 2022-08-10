import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';
import { OrdersForAdminService } from '../../orders-for-admin.service';
import { ShipperShipmentOrdersService } from './shipper-shipment-orders.service';

@Component({
  selector: 'app-shipper-shipment-orders',
  templateUrl: './shipper-shipment-orders.component.html',
  styleUrls: ['./shipper-shipment-orders.component.css']
})
export class ShipperShipmentOrdersComponent implements OnInit {

  subscription: Subscription;
  shippedList: any[] = [];
  shippedCount = 0;
  getStyleFromNav: string = null;
  shipperOrderShipmentData: any;


  constructor(private _ordersForAdminService: OrdersForAdminService,
    private DialogService: ConfirmationService, private _adminService: AdminService,
    private _shipperShipmentOrders: ShipperShipmentOrdersService, private _activateRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    const getShipperId = this._activateRoute.snapshot.params['id'];
    console.log(getShipperId);
    let shipperObj: any = {
      pageNo: 1,
      shipperUserId: getShipperId
    }

    this.shipperOrderShipmentData = shipperObj;

    this.shippedOrdersList(shipperObj);

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });
  }

  shippedOrdersList(pageNo: number) {
    this.subscription = this._shipperShipmentOrders.getShippmentDoneByShipperList(pageNo).subscribe((data: any) => {
      this.shippedList = data.orderList;
      this.shippedCount = data.dataCount;
    })
  }

  tablePageNoChange(pageNo: number) {
    this.shippedList = [];
    this.shippedOrdersList(this.shipperOrderShipmentData);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
