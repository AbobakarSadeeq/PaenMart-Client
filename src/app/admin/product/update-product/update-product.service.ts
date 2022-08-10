import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {

  constructor(private _Http:HttpClient) { }

  DeleteImage(imageId:string){
    return this._Http.delete("https://localhost:44300/api/Product/DeleteSingleProductSingleImage/" + imageId);
  }

  UpdateProduct(productData:any){
    return this._Http.put("https://localhost:44300/api/Product", productData);

  }


  getBrands(Id: number) {
    return this._Http.get("https://localhost:44300/api/ProductBrand/GetAllProductBrandByNestSubCategory/" + Id);
  }

}

