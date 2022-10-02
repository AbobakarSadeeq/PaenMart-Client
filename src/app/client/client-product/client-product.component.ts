import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDiscountDealsService } from 'src/app/admin/product-discount-deals/product-discount-deals.service';
import { SponsoredAdService } from 'src/app/admin/sponsored-ad/sponsored-ad.service';
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
  sideMixProductsPage: any;


  constructor(private _activateRoute: ActivatedRoute,
    private _clientProduct: ClientProductService,
    private _route: Router,
    private _sponsoreAd: SponsoredAdService,
    private _ProductDiscountDealService: ProductDiscountDealsService) {
    this.subscription = this._activateRoute.params.subscribe(
      (params: Params) => {
        this._route.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
      });
  }

  LiveDiscountDeal: any[] = [];
  ngOnInit(): void {


    // ad
    this.subscription = this._sponsoreAd.getAdByPageName("MixProductsPage").subscribe((data: any) => {
        this.sideMixProductsPage = data;
    })


    this.subscription = this._ProductDiscountDealService.getLiveDiscountDeals().subscribe((data: any) => {
      this.LiveDiscountDeal = data;
    });


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
      console.log(data);
    });

  }

  isProductBrandValid = false;
  selectedProductBrand = 0;
  filterProductShows(brandId: number) {
    this.dealProducts = [];
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

  dealProducts: any[] = [];
  filterProductByDiscountDealShows(selectedDiscountId: number) {
    this.productList = [];
    this.subscription = this._ProductDiscountDealService.getSingleDealProducts(selectedDiscountId).subscribe((data: any) => {
      this.dealProducts = data;
    })
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
