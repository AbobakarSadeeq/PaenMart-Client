import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderReviewService {

  constructor(private http: HttpClient) { }

  getPendingProductList(userId: string): Observable<any> {
    return this.http.get(environment.userOrderProductReviewApiUrl + "/" + userId);
  }

  getSingleProduct(productId: number) {
    return this.http.get(environment.userOrderProductReviewApiUrl + "/GetSingleProduct/" + productId);
  }

  addReview(reviewData: any) {
    return this.http.post(environment.userOrderProductReviewApiUrl, reviewData);
  }

  getReviewedDoneProductList(userId: string): Observable<any> {
    return this.http.get(environment.userOrderProductReviewApiUrl + "/GetReviewedReviewByUser/" + userId);
  }

  getSingleProductAllReviews(data: any): Observable<any> {
    return this.http.post(environment.userOrderProductReviewApiUrl + "/GetAllUserReviewsOfSingleProduct", data);
  }



}
