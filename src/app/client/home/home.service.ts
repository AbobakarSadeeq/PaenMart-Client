import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _Http: HttpClient) { }
  GetMostFiveProductSelled(): Observable<any> {
    return this._Http.get(environment.productApiUrl + "/GetMostSellFiveProducts");
  }

  GetFiveDiscountProducst(): Observable<any> {
    return this._Http.get(environment.homeApiUrl);
  }

  GetFiveProductReview(): Observable<any> {
    return this._Http.get(environment.homeApiUrl + "/GetFiveLatestProductReview");
  }

  GetCarouselImages(): Observable<any> {
    return this._Http.get(environment.carouselApiUrl);
  }



}
