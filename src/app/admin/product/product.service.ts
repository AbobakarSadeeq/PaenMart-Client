import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _Http:HttpClient) { }


  GetSingleProductById(singleProductId:number){
    return this._Http.get(environment.productApiUrl + "/" + singleProductId);
  }

  GetProducts(nestCategoryIdAndPageNo:any){
    return this._Http.get(environment.productApiUrl + "/GetSelectedCategoryProducts",
    {
      params: {
        nestCategoryId:nestCategoryIdAndPageNo.nestCategoryId,
        pageSelectedNo:nestCategoryIdAndPageNo.pageSelectedNo
      }
    });
  }

  DeleteSingleProduct(productId:number){
    return this._Http.delete(environment.productApiUrl +  "/" + productId );
  }
}
