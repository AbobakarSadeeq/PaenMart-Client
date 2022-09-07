import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchProductService } from './search-product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  subscription: Subscription;
  brands: any[] = [];
  productList: any;
  searchByData: string;
  productTotalCount: number = 0;
  notProductFoundBySearchMesg = null;

  constructor(private _activateRoute: ActivatedRoute,
    private _httpRoute: Router,
    private _searchProductService: SearchProductService) {

    this._activateRoute.queryParams.subscribe((queries: any) => {
      this.searchProductBySearchValue(queries.searchingData);
    });

  }

  ngOnInit(): void {



    let searching = this._activateRoute.snapshot.queryParamMap.get("searchingData");


  }

  filterProductShows(brandId: number) {

  }


  tablePageNoChange(changePageNo: number) {
    let myObj = {
      pageNo: changePageNo,
      searchText: this.searchByData
    }
    this.subscription = this._searchProductService.GetAllProducts(myObj).subscribe((data: any) => {

      this.productList = data.productsFoundData;
      this.productTotalCount = data.productsFoundDataCount;
    },
      (error: HttpErrorResponse) => {
        this.notProductFoundBySearchMesg = error.error;
      })
  }

  searchProductBySearchValue(searchData: string) {
    this.productList = [];
    this.productTotalCount = 0;
    this.notProductFoundBySearchMesg = null;
    this.searchByData = searchData;
    let myObj = {
      pageNo: 1,
      searchText: searchData
    }
    this.subscription = this._searchProductService.GetAllProducts(myObj).subscribe((data: any) => {
      console.log(data);
      this.productList = data.productsFoundData;
      this.productTotalCount = data.productsFoundDataCount;
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.notProductFoundBySearchMesg = error.error;
      })
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
