import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientOrderService } from './client-order.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {

  subscription: Subscription;
  showIndicator = false;

  penddingOrders: any[] = [];
  shippedOrders: any[] = [];
  cancelOrder: any[] = [];
  userId: string;

  onTabChangeOrder: any = null;


  constructor(private DialogService: ConfirmationService,
    private _activateRoute: ActivatedRoute,
    private _route: Router,
    private _authService: AuthService,
    private _clientOrder: ClientOrderService) { }


  ngOnInit(): void {

    const getUrlId = this._activateRoute.snapshot.params['id'];
    this.userId = getUrlId;


    // Confirm Button Hide


    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });

    this.getOrdersOfSingleUser(getUrlId);
  }

  getOrdersOfSingleUser(dataId: string) {
    this.subscription = this._clientOrder.getOrdersById(dataId).subscribe((data: any[]) => {
      console.log(data);
      this.penddingOrders = data.filter(a => a.orderStatus == "Pending");
      this.shippedOrders = data.filter(a => a.orderStatus == "Shipped");
      this.cancelOrder = data.filter(a => a.orderStatus == "Canceled");

    })
  }

  onTabChanged(event: any) {
    console.log(event);
    if (event.index == 0) {
      this.onTabChangeOrder = "pending";
    } else if (event.index == 1) {
      this.onTabChangeOrder = "shipped";
    } else if (event.index == 2) {
      this.onTabChangeOrder = "canceled";
    }
  }

  // Deleteing Order
  CancelingOrderByUser(dataId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Cancel this completely order?',
      accept: () => {
        this.showIndicator = true;
        this.subscription = this._clientOrder.deleteOrderCompletebyUser(dataId).subscribe(() => {
          this.showIndicator = false;
          this.getOrdersOfSingleUser(this.userId);

        })
      }
    });
  }

  navigatingPendingOrder(dataId: number) {
    this._route.navigate(['/Client/OrdersDetail/', dataId], { queryParams: { orderStatus: "ClientPendding" } });
  }

}
