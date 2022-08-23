import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientOrderReviewService } from './client-order-review.service';

@Component({
  selector: 'app-client-order-review',
  templateUrl: './client-order-review.component.html',
  styleUrls: ['./client-order-review.component.css']
})
export class ClientOrderReviewComponent implements OnInit {

  constructor(private _route: Router, private _activateRoute: ActivatedRoute,
     private _clientOrderReviewService: ClientOrderReviewService) { }

  ngOnInit(): void {

    if (!localStorage.getItem('token')) {
      this._route.navigate(['/Auth'], { queryParams: { orderReview: true } });
    }

    if(localStorage.getItem('token')){
      var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      let userId = payload.UserID;

    }



  }

}
