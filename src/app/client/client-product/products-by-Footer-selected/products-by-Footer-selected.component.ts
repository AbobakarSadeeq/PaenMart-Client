import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsByBrandService } from './products-by-Footer-selected.service';

@Component({
  selector: 'app-products-by-brand',
  templateUrl: './products-by-Footer-selected.component.html',
  styleUrls: ['./products-by-Footer-selected.component.css']
})
export class ProductsByFooterSelected implements OnInit {
  subscription: Subscription;

  productTotalCount = 0;

  selectedBrandProducts: any[] = [];
  selectedBrandName: string;
  selectedBrandId: number;
  showBrandsProduct = false;

  selectedNestCategoryProducts: any[] = [];
  selectedNestCategoryName: string;
  selectedNestCategoryId: number;
  showNestcategoryProducts = false;

  constructor(private _route: Router,
    private _activateRoute: ActivatedRoute,
    private _productsByBrandService: ProductsByBrandService) {

    _activateRoute.paramMap.subscribe((queries: any) => {
      if (_activateRoute.snapshot.queryParamMap.get('searchBy') == "Brand") {
        this.fetchingSelectedBrandProducts(queries.params.id);
        this.selectedBrandName = queries.params.name;
        this.selectedBrandId = queries.params.id;
        this.selectedNestCategoryName = "";
        this.selectedNestCategoryId = 0;
      } else if (_activateRoute.snapshot.queryParamMap.get('searchBy') == "NestCategory") {
        this.fetchingSelectedNestCategoryProducts(queries.params.id);
        this.selectedNestCategoryName = queries.params.name;
        this.selectedNestCategoryId = queries.params.id;
        this.selectedBrandName = "";
        this.selectedBrandId = 0;

      }
    });

  }

  ngOnInit(): void {






  }

  fetchingSelectedBrandProducts(brandId: number) {
    this.showNestcategoryProducts = false;
    this.showBrandsProduct = true;

    this.selectedBrandProducts = [];
    this.selectedNestCategoryProducts = [];
    this.productTotalCount = 0;
    let customObj = {
      pageNo: 1,
      brandId: brandId
    }
    this.subscription = this._productsByBrandService.GetAll(customObj).subscribe((data: any) => {
      this.selectedBrandProducts = data.matchingProductsList;
      this.productTotalCount = data.productsFoundCount;


    })
  }

  fetchingSelectedNestCategoryProducts(NestCategoryId: number) {
    this.showBrandsProduct = false;
    this.showNestcategoryProducts = true;

    this.selectedNestCategoryProducts = [];
    this.selectedBrandProducts = [];
    this.productTotalCount = 0;
    let customObj = {
      pageSelectedNo: 1,
      nestCategoryId: NestCategoryId,
    }
    this.subscription = this._productsByBrandService.getProductsByNestCategory(customObj).subscribe((data: any) => {
      this.selectedNestCategoryProducts = data.productData
      this.productTotalCount = data.countProducts;
    })
  }

  tablePageNoChange(changePageNo: number) {
    if (this._activateRoute.snapshot.queryParamMap.get('searchBy') == "Brand") {
      let myObj = {
        pageNo: changePageNo,
        searchText: this.selectedBrandId
      }
      this.subscription = this._productsByBrandService.GetAll(myObj).subscribe((data: any) => {
        this.selectedBrandName = data.matchingProductsList;
        this.productTotalCount = data.productsFoundCount;
      });

    } else if (this._activateRoute.snapshot.queryParamMap.get('searchBy') == "NestCategory") {
      let customObj = {
        pageSelectedNo: changePageNo,
        nestCategoryId: this.selectedNestCategoryId,
      }
      this.subscription = this._productsByBrandService.getProductsByNestCategory(customObj).subscribe((data: any) => {
        this.selectedNestCategoryProducts = data.productData
        this.productTotalCount = data.countProducts;
      })
    }

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
