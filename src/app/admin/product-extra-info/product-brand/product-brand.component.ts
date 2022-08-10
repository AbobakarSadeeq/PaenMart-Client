import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { ProductBrandService } from './product-brand.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription:Subscription;

  productBrands:any [] = [];
  displayAddProductBrandModel = false;
  displayUpdateProductBrandModel = false;

  productBrandFormData: FormGroup;

  constructor(private _adminService: AdminService,
     private _productBrand:ProductBrandService,
     private DialogService: ConfirmationService,
     private _fb: FormBuilder,) { }




  ngOnInit(): void {


    this.productBrandFormData = this._fb.group({
      brandName:['',[Validators.required]]
    });

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getAllProductBrand();
  }

  // Get All Product Brand
  getAllProductBrand(){
    this.subscription = this._productBrand.GetAll().subscribe((data:any)=>{
      this.productBrands = data;
    });
  }

  // Insert Product brand

  showProductBrandModel(){
    this.displayAddProductBrandModel = true;
  }


  onSaveProductBrand(){
    this._productBrand.Insert(this.productBrandFormData.value).subscribe(()=>{
      this.getAllProductBrand();
    });
    this.removeErrorMessage();
    this.displayAddProductBrandModel = false;
  }




  // Get Delete of product brand
  onDeleteProductBrand(ProductBrandId:number){
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Product brand?',
      accept: () => {
        this._productBrand.DeleteData(ProductBrandId).subscribe(()=>{
          this.getAllProductBrand();
        });
      }
    });


  }

  getDataForUpdate(productBrandId:number){
    this.displayUpdateProductBrandModel = true;
    this.subscription = this._productBrand.get(productBrandId).subscribe((data: any) => {
      this.productBrandFormData = this._fb.group({
        productBrandID:[productBrandId],
        brandName: [data?.brandName]
      });
    });
    }

  onUpdateProductBrand(){
    this.subscription = this._productBrand.UpdateData(this.productBrandFormData.value).subscribe(()=>{
      this.getAllProductBrand();
    });
    this.displayUpdateProductBrandModel = false;
    this.removeErrorMessage();
  }

  removeErrorMessage() {
    this.productBrandFormData.reset();
  }



}
