import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductDiscountDealsService } from 'src/app/admin/product-discount-deals/product-discount-deals.service';
import { ProductsByBrandService } from '../client-product/products-by-Footer-selected/products-by-Footer-selected.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  brands: any[] = [];
  nestCategories: any[] = [];
  LiveDiscountDeal: any[] = [];
  subscription: Subscription;

  userId = null;

  constructor(private _productsByBrand: ProductsByBrandService, private _ProductDiscountDealService: ProductDiscountDealsService) { }

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      this.userId = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1])).UserID;
    }

    this.subscription = this._ProductDiscountDealService.getLiveDiscountDeals().subscribe((data: any) => {
      this.LiveDiscountDeal = data;
    });


    this.subscription = this._productsByBrand.GetAllBrands().subscribe((data: any) => {
      this.brands = data.slice(0, 10);
    })

    this.subscription = this._productsByBrand.GetAllNestCategories().subscribe((data: any) => {
      this.nestCategories = data;
    })


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
