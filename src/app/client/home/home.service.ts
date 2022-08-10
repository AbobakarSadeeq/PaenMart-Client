import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _Http:HttpClient) { }

  GetMostFiveProductSelled(): Observable<any> {
    return this._Http.get("https://localhost:44300/api/Product/GetMostSellFiveProducts");
  }


  GetCarouselImages(): Observable<any> {
    return this._Http.get("https://localhost:44300/api/Carousel");
  }



}
