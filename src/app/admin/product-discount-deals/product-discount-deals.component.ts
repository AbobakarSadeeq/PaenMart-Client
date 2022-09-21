import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ProductDiscountDealsService } from './product-discount-deals.service';

@Component({
  selector: 'app-product-discount-deals',
  templateUrl: './product-discount-deals.component.html',
  styleUrls: ['./product-discount-deals.component.css']
})
export class ProductDiscountDealsComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;
  dealsList: any[] = [];



  constructor(private _route: Router,
    private _activatedRouter: ActivatedRoute,
    private _productDiscountDealsService: ProductDiscountDealsService,
    private DialogService: ConfirmationService,
    private fb: FormBuilder,
    private _adminService: AdminService) { }

  ngOnInit(): void {

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getAllDiscountDeals();
  }

  getAllDiscountDeals() {
    this.subscription = this._productDiscountDealsService.getLiveDiscountDeals().subscribe((data: any) => {
      this.dealsList = data
    })
  }


  openDeleteDialogConfarmation(dataId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Discount Deal?',
      accept: () => {
        this._productDiscountDealsService.DeleteDiscountDeal(dataId).subscribe(() => {
          this.getAllDiscountDeals();
        })
      }
    });

  }


  displayDetailProductDeal = false;
  selectedDealProductsList:any[]=[];
  openDetailDealOfProductsDialog(id:number) {
    this.displayDetailProductDeal = true;
    this.subscription = this._productDiscountDealsService.getSingleDealProducts(id).subscribe((data:any)=>{
      this.selectedDealProductsList = data;
    })

  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
