import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  constructor(private _http: HttpClient) { }

  GetAllProducts(data: any): Observable<any> {
    return this._http.post(environment.extraFeaturesApiUrl + "/SearchItems", data);
  }

  GetAllRecommendedSearch(data: any): Observable<any> {
    return this._http.post(environment.extraFeaturesApiUrl + "/AutoCompletionSearch", data);
  }

}
