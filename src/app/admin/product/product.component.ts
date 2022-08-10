import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ProductService } from './product.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  getStyleFromNav: string = null;

  selectedCategoryProductData:any;

  // Query string
  getSelectedProductName = "";
  getSelectedDynamicFormId = 0;
  getSelectedNestCategoryId = 0;

  subscription: Subscription;

  constructor(private _adminService: AdminService,
    private _productService: ProductService,
    private _route:Router,
    private _activateRoute:ActivatedRoute,
    private DialogService: ConfirmationService) {

      this.subscription = this._activateRoute.params.subscribe(
        (params: Params) => {
          this._route.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
        });

     }

  ngOnInit(): void {
    this._adminService.sideBar.subscribe((data:string)=>{
      this.getStyleFromNav = data;
    })


    this.getSelectedProductName = this._activateRoute.snapshot.params['NestCategoryName'];
    this.getSelectedDynamicFormId = +this._activateRoute.snapshot.queryParamMap.get("selectedDynamicFormStructureId");
    this.getSelectedNestCategoryId = +this._activateRoute.snapshot.queryParamMap.get("NestCategoryId");



   // this.getProductById(10);

   this.getSelectedCategoryAllProduct(this.getSelectedNestCategoryId, 1);

  }


  // Get single product by productId
  getProductById(selectedProductId: number) {
    this.subscription = this._productService.GetSingleProductById(selectedProductId).subscribe((data: any) => {
      let a = JSON.parse(data.productDetails);
    });
  }

  // Get All
  getSelectedCategoryAllProduct(selectedNestSubCategoryId:number, paginationNo:number){
    let nestCategoryIdWithPaginationNo = {
      nestCategoryId: selectedNestSubCategoryId,
      pageSelectedNo:paginationNo
    }

    this.subscription = this._productService.GetProducts(nestCategoryIdWithPaginationNo).subscribe((data:any)=>{

      this.selectedCategoryProductData = data;
    });
  }

  selectedPageNo = 1;
  tablePageNoChange(paginationNo:number){
    let nestCategoryIdWithPaginationNo = {
      nestCategoryId: this.getSelectedNestCategoryId,
      pageSelectedNo:paginationNo
    }
    this.selectedPageNo = paginationNo;
    this.subscription = this._productService.GetProducts(nestCategoryIdWithPaginationNo).subscribe((data:any)=>{
      this.selectedCategoryProductData = data;
    });
  }

    // Delete Product
    openDeleteDialogConfarmation(dataId: any, selectedProductName:string) {
      this.DialogService.confirm({
        message: `Are you sure you want to Delete ${selectedProductName}?`,
        accept: () => {
          this._productService.DeleteSingleProduct(dataId).subscribe(() => {
            this.getSelectedCategoryAllProduct(this.getSelectedNestCategoryId , this.selectedPageNo);
          });
        }
      });
    }

    // product detail

    singleProductData:any;
    displayModal = null;
    dynamicData:any[] = [];
    openProductDetailDailog(Id:number){
      this.singleProductData = null;
      this.dynamicData = [];
      this.displayModal = true;
      this.subscription = this._productService.GetSingleProductById(Id).subscribe((data:any)=>{
        let convertJsonStringToJsonObj = JSON.parse(data.productDetails);
        let convertJsonObjToJsObj = JSON.parse(convertJsonStringToJsonObj);

        for(const [key, value] of Object.entries(convertJsonObjToJsObj)){
          if(key == 'productSize'){
          this.dynamicData.push({objectKey:"Product size", objectValue:value});
          }else{
            if(value.constructor === Array && key != "productSize"){
              let custom:any = value;
              let filterDataOfCheckBox = [];
             for(var checkedProductSize of custom){
               if(checkedProductSize.check == true){
                 filterDataOfCheckBox.push(checkedProductSize.checkBoxValue)

               }
             }
              this.dynamicData.push({objectKey:key, objectValue:filterDataOfCheckBox});

            }else{
              this.dynamicData.push({objectKey:key, objectValue:value});

            }
          }
        }


        this.singleProductData = data;
      });

    }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
