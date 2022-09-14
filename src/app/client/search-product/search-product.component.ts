import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SponsoredAdService } from 'src/app/admin/sponsored-ad/sponsored-ad.service';
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
  sideProductSearchAd: any;
  popUpAd: any;
  sideHomeAd: any;
  constructor(private _activateRoute: ActivatedRoute,
    private _httpRoute: Router,
    private _searchProductService: SearchProductService,
    private _sponsoreAd: SponsoredAdService) {

    this._activateRoute.queryParams.subscribe((queries: any) => {
      this.searchProductBySearchValue(queries.searchingData);
    });

  }

  ngOnInit(): void {


    this.subscription = this._sponsoreAd.getAdByPageName("Home").subscribe((data: any) => {
      for (var singleHomeSponsoreAd of data) {
        if (singleHomeSponsoreAd.liveOnPageName == "HomePopUpPage") {
          this.popUpAd = singleHomeSponsoreAd;
        } else {
          this.sideHomeAd = singleHomeSponsoreAd;
        }
      }
    })
    this.subscription = this._sponsoreAd.getAdByPageName("SearchProductPage").subscribe((data: any) => {
      this.sideProductSearchAd = data;
    })

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
      this.productList = data.productsFoundData;
      this.productTotalCount = data.productsFoundDataCount;
    },
      (error: HttpErrorResponse) => {
        this.notProductFoundBySearchMesg = error.error;
      })
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
