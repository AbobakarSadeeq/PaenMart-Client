import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDiscountDealsService } from 'src/app/admin/product-discount-deals/product-discount-deals.service';
import { SponsoredAdService } from 'src/app/admin/sponsored-ad/sponsored-ad.service';
import { ClientProductService } from '../client-product/client-product.service';

@Component({
  selector: 'app-client-product-discount-deal',
  templateUrl: './client-product-discount-deal.component.html',
  styleUrls: ['./client-product-discount-deal.component.css']
})
export class ClientProductDiscountDealComponent implements OnInit {
  subscription: Subscription;
  dealProducts: any[] = [];
  LiveDiscountDeal: any[] = [];
  selectedDealName = null;

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

  ngOnInit(): void {

    let selectedDiscountId = this._activateRoute.snapshot.params['id'];

    this.subscription = this._ProductDiscountDealService.getSingleDealProducts(selectedDiscountId).subscribe((data: any) => {
      this.dealProducts = data;
    });

    if (this.LiveDiscountDeal) {
      this.subscription = this._ProductDiscountDealService.getLiveDiscountDeals().subscribe((data: any) => {
        this.LiveDiscountDeal = data;
      });
    }

    setTimeout(() => {
      let selectedDiscountObj = this.LiveDiscountDeal.find(a => a.discountDealID == selectedDiscountId);
      this.selectedDealName = selectedDiscountObj.dealName;
    }, 500)


  }







}
