import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SearchProductService {

  constructor(private _http: HttpClient) { }

  GetAllProducts(data: any): Observable<any> {
    return this._http.post("https://localhost:44300/api/ExtraFeatures/SearchItems", data);
  }
}
