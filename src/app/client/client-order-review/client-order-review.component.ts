import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientOrderReviewService } from './client-order-review.service';

@Component({
  selector: 'app-client-order-review',
  templateUrl: './client-order-review.component.html',
  styleUrls: ['./client-order-review.component.css']
})
export class ClientOrderReviewComponent implements OnInit {
  pendingOrderReviewArr: any[] = [];
  reviewedOrdersReviewArr: any[] = [];
  subscription: Subscription;
  selectedUserId: string;

  constructor(private _route: Router, private _activateRoute: ActivatedRoute,
    private _clientOrderReviewService: ClientOrderReviewService) { }

  ngOnInit(): void {

    if (!localStorage.getItem('token')) {
      this._route.navigate(['/Auth'], { queryParams: { orderReview: true } });
    }

    if (localStorage.getItem('token')) {
      var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      let userId = payload.UserID;
      this.selectedUserId = payload.UserID;
      this.getPendingOrdersReviewList(userId);
    }



  }

  getPendingOrdersReviewList(Id: string) {
    this.subscription = this._clientOrderReviewService.getPendingProductList(Id).subscribe((data: any) => {
      this.pendingOrderReviewArr = data;
    });
  }


  OpenSingleProductReviewPage(selectedProductId: number, userOrderProductReviewId: number) {
    this._route.navigate(['/Client/Write-Reviews/Product/', selectedProductId],
      { queryParams: { singleUserOrderProductReviewId: userOrderProductReviewId } });
  }

  onTabChanged(event: any) {
    if (event.index == 1) {
      this.subscription = this._clientOrderReviewService.getReviewedDoneProductList(this.selectedUserId).subscribe((data: any) => {
        this.reviewedOrdersReviewArr = data;
        console.log(data);
      })
    }
  }

  reviewStarsSelected(selectedStarsNo: number) {

  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
