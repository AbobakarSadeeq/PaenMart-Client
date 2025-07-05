import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(private _Http: HttpClient) { }

  DeleteImage(imageId: string) {
    return this._Http.delete(`${environment.productApiUrl}/DeleteSingleProductSingleImage/${imageId}`);
  }

  UpdateProduct(productData: any) {
    return this._Http.put(environment.productApiUrl, productData);
  }


  getBrands(Id: number) {
    return this._Http.get(`${environment.productBrandApiUrl}/GetAllProductBrandByNestSubCategory/${Id}`);
  }

}

