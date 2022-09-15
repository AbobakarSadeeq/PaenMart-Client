import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientOrderReviewService } from '../client-order-review.service';

@Component({
  selector: 'app-client-single-product-review',
  templateUrl: './client-single-product-review.component.html',
  styleUrls: ['./client-single-product-review.component.css']
})
export class ClientSingleProductReviewComponent implements OnInit {

  subscription: Subscription;
  singleProductDetail: any;
  selectedStars = 0;
  reviewCommentTextArea = "";
  reviewSubmitErrorsHandling = null;
  selectedPhotos: any[] = [];

  constructor(private _route: Router, private _activateRoute: ActivatedRoute,
    private _clientOrderReviewService: ClientOrderReviewService) { }

  ngOnInit(): void {

    if(!localStorage.getItem("token")){
      this._route.navigate(['/Auth']);
    }


    const getProductIdByRouteParam = +this._activateRoute.snapshot.params['id'];
    this.getSingleProductData(getProductIdByRouteParam);
  }

  getSingleProductData(selectedProductId: number) {
    this.subscription = this._clientOrderReviewService.getSingleProduct(selectedProductId).subscribe((data: any) => {
      this.singleProductDetail = data;
    });
  }


  reviewStarsSelected(starsCount: number) {
    this.selectedStars = starsCount;
  }

  // files selected
  fileChange(myEvent: any) {
    this.selectedPhotos.push(<File>myEvent?.target?.files[0]);

  }


  reviewSubmit() {
    // validation errors.
    if (this.selectedStars == 0) {
      this.reviewSubmitErrorsHandling = "Please select the review stars";
      return;
    } else if (this.reviewCommentTextArea.split(" ").length < 20) {
      this.reviewSubmitErrorsHandling = "Sorry, please write the review more then 20 words";
      return;
    } else if (this.selectedPhotos.length == 0) {
      this.reviewSubmitErrorsHandling = "Least one review photo is required"
      return;
    }
    // review is valid

    this.reviewSubmitErrorsHandling = null;

    let singleUserReview = {
      userId: JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID,
      productId: this._activateRoute.snapshot.params['id'],
      productComment: this.reviewCommentTextArea,
      reviewStatus: "Reviewed",
      ratingStars: this.selectedStars.toString(),

    }
    console.log(this._activateRoute.snapshot.queryParamMap.get('singleUserOrderProductReviewId'));
    const formForm = new FormData();
    formForm.append('userId', singleUserReview.userId);
    formForm.append('productId', singleUserReview.productId);
    formForm.append('productComment', singleUserReview.productComment);
    formForm.append('reviewStatus', singleUserReview.reviewStatus);
    formForm.append('ratingStars', singleUserReview.ratingStars);
    formForm.append('orderProductReviewId', this._activateRoute.snapshot.queryParamMap.get('singleUserOrderProductReviewId'));
    for (var i = 0; i < this.selectedPhotos.length; i++) {
      formForm.append("File", this.selectedPhotos[i], this.selectedPhotos[i]?.name);
    }

    this.subscription = this._clientOrderReviewService.addReview(formForm).subscribe((data: any) => {
      this._route.navigate(['/Client/Reviews']);

    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }




}
