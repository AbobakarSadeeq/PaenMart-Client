import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientOrderService } from '../client-order.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  OrderTrackProducts: any;

  orderTrackerNotFoundOrderMessage = null;

  constructor(private _orderService: ClientOrderService, private route:Router) { }

  ngOnInit(): void {

    if(!localStorage.getItem("token")){
      this.route.navigate(['/Auth']);
    }

  }

  OrderTrack(trackVal: any) {
    let customObj = {
      userId: JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID,
      orderTrackNumber: trackVal
    }
   this._orderService.trackOrderProductsFetching(customObj).subscribe((data: any) => {
    console.log(data);
      this.OrderTrackProducts = data

      console.log(data);
      this.orderTrackerNotFoundOrderMessage = null;
    }, (error: HttpErrorResponse) => {
      this.orderTrackerNotFoundOrderMessage = error.error;
    })
  }



}
