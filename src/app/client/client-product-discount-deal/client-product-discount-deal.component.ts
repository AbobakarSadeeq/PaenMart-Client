import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDiscountDealsService } from 'src/app/admin/product-discount-deals/product-discount-deals.service';

@Component({
  selector: 'app-client-product-discount-deal',
  templateUrl: './client-product-discount-deal.component.html',
  styleUrls: ['./client-product-discount-deal.component.css']
})
export class ClientProductDiscountDealComponent implements OnInit {
  subscription: Subscription;

  constructor(private _route:Router,
    private _activatedRoute:ActivatedRoute,
    private _ProductDiscountDealService:ProductDiscountDealsService,
    ) { }

  ngOnInit(): void {
  }

}
