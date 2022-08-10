import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientProductService } from './client-product.service';

@Component({
  selector: 'app-client-product',
  templateUrl: './client-product.component.html',
  styleUrls: ['./client-product.component.css']
})
export class ClientProductComponent implements OnInit {

  subscription: Subscription;
  brands: any[] = [];
  selectedNestCategoryId = 0;

  productList: any;

  constructor(private _activateRoute: ActivatedRoute, private _clientProduct: ClientProductService, private _route: Router) {
    this.subscription = this._activateRoute.params.subscribe(
      (params: Params) => {
        this._route.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
      });
  }

  ngOnInit(): void {
    let getSelectedNestCategoryData = this._activateRoute.snapshot.params['id'];
    this.selectedNestCategoryId = getSelectedNestCategoryData;

    // get brands by category id
    this.subscription = this._clientProduct.getBrands(getSelectedNestCategoryData).subscribe((data: any) => {
      this.brands = data;
    });

    // get products by category id
    let selectedData = {
      nestCategoryId: getSelectedNestCategoryData,
      pageSelectedNo: 1,
      singleCategoryTotalProductsCount: 0
    };
    this.subscription = this._clientProduct.getProductsByCategory(selectedData).subscribe((data: any) => {
      this.productList = data;
    });

  }

  isProductBrandValid = false;
  selectedProductBrand = 0;
  filterProductShows(brandId: number) {

    this.selectedProductBrand = brandId;
    this.productList = {};

    if (brandId == 0) {
      // getAll
      let selectedData = {
        nestCategoryId: this.selectedNestCategoryId,
        pageSelectedNo: 1,
        singleCategoryTotalProductsCount: 0,
      };

      this.subscription = this._clientProduct.getProductsByCategory(selectedData).subscribe((data: any) => {
        this.productList = data;
      });
    } else {
      this.isProductBrandValid = true;
      let selectedNestCategoryAndBrand = {
        brandId: brandId,
        nestCategoryId: + this.selectedNestCategoryId,
        pageSelectedNo: 1,
        singleCategoryTotalProductsCount: 0
      };
      this.subscription = this._clientProduct.getProductsByBrands(selectedNestCategoryAndBrand).subscribe((data: any) => {
        if (data.countProducts > 0) {
          this.productList = data;
        } else {
          this.productList.productData = [];
        }
      });
    }

  }

  tablePageNoChange(pageNo: number) {
    let selectedData = {
      nestCategoryId: this.selectedNestCategoryId,
      pageSelectedNo: pageNo,
      singleCategoryTotalProductsCount: 0,
      brandId: this.selectedProductBrand
    };

    this.subscription = this._clientProduct.getProductsByCategory(selectedData).subscribe((data: any) => {
      this.productList = data;
    });
    if (this.isProductBrandValid) {
      this.subscription = this._clientProduct.getProductsByBrands(selectedData).subscribe((data: any) => {
        this.productList = data;
      });
      this.isProductBrandValid = false;
    }
  }
}
