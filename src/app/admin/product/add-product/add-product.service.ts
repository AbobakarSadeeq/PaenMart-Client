import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private _Http: HttpClient) { }

  AddProduct(data: any) {
    return this._Http.post(environment.productApiUrl, data);
  }

  getBrands(Id: number) {
    return this._Http.get(environment.productBrandApiUrl + "/GetAllProductBrandByNestSubCategory/" + Id);
  }


}
