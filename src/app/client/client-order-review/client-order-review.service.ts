import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientOrderReviewService {

  constructor(private http: HttpClient) { }

  getPendingProductList(userId: string): Observable<any> {
    return this.http.get("https://localhost:44300/api/UserOrderProductReview/" + userId);
  }

  getSingleProduct(productId: number) {
    return this.http.get("https://localhost:44300/api/UserOrderProductReview/GetSingleProduct/" + productId);
  }

  addReview(reviewData: any) {
    return this.http.post("https://localhost:44300/api/UserOrderProductReview", reviewData);
  }

  getReviewedDoneProductList(userId: string): Observable<any> {
    return this.http.get("https://localhost:44300/api/UserOrderProductReview/GetReviewedReviewByUser/" + userId);
  }

  getSingleProductAllReviews(data: any): Observable<any> {
    return this.http.post("https://localhost:44300/api/UserOrderProductReview/GetAllUserReviewsOfSingleProduct", data);
  }


}
