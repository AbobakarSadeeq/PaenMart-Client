import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { ProductDiscountDealsService } from '../product-discount-deals.service';

@Component({
  selector: 'app-update-product-deals',
  templateUrl: './update-product-deals.component.html',
  styleUrls: ['./update-product-deals.component.css']
})
export class UpdateProductDealsComponent implements OnInit {
  selectedDate = new Date();
  getStyleFromNav: string = null;
  subscription: Subscription;
  updateProductDealsForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _adminService: AdminService,
    private DialogService: ConfirmationService,
    private _productDiscountDealsService: ProductDiscountDealsService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.updateProductDealsForm = this._fb.group({
      dealName: ['', [Validators.required]],
      expire_at: ['', [Validators.required]],
    });

    this.subscription = this._productDiscountDealsService.getSingleDealProducts(this._activatedRoute.snapshot.params['id'])
      .subscribe((data: any) => {
        this.selectedDate = data[0]?.expire_At;
        let customizingDate = new Date(data[0]?.expire_At);
        var expire_At_Date = new Date();
        this.updateProductDealsForm = this._fb.group({
          dealName: [data[0].dealName, [Validators.required]],
          expire_at: [customizingDate.getFullYear() + "-" + String(customizingDate.getMonth() + 1).padStart(2, '0') + "-" + String(customizingDate.getDate()).padStart(2, '0'), [Validators.required]],
        });

      });

  }

}
