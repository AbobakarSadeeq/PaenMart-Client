import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { single, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { NestSubCategoryService } from '../../products-menu/nest-sub-category/nest-sub-category.service';
import { SubCategoryService } from '../../products-menu/sub-category/sub-category.service';
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

  selectedProductsInDeal: any[] = [];

  constructor(private _route: Router,
    private _activatedRouter: ActivatedRoute,
    private _productDiscountDealsService: ProductDiscountDealsService,
    private DialogService: ConfirmationService,
    private fb: FormBuilder,
    private _adminService: AdminService,
    private _categoryService: CategoryService,
    private _subCategoriesService: SubCategoryService,
    private _nestSubCatgories: NestSubCategoryService) { }

  ngOnInit(): void {

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.updateProductDealsForm = this.fb.group({
      dealName: ['', [Validators.required]],
      expire_at: ['', [Validators.required]],
    });

    this.subscription = this._productDiscountDealsService.getSingleDealProducts(this._activatedRouter.snapshot.params['id'])
      .subscribe((data: any) => {
        this.selectedProductsInDeal = data;
        console.log(data);
        this.selectedDate = data[0]?.expire_At;
        let customizingDate = new Date(data[0]?.expire_At);
        this.updateProductDealsForm = this.fb.group({
          dealName: [data[0].dealName, [Validators.required]],
          expire_at: [customizingDate.getFullYear() + "-" + String(customizingDate.getMonth() + 1).padStart(2, '0') + "-" + String(customizingDate.getDate()).padStart(2, '0'), [Validators.required]],
        });
      });

    // call all categoires when component render
    this.getAllCategories();

  }


  // ------ Getting Categories ------
  categories: any[] = [];
  categorySelectedName: string;
  getAllCategories() {
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
  }

  categorySelected(selectedCategoryIdEvent: Event) {
    this.selectedCategoriesProducts = [];
    let getCategoryIdFromEvent: number = +(selectedCategoryIdEvent.target as HTMLInputElement).value;
    this.getAllSubcategoires(getCategoryIdFromEvent);
    this.nestSubCategories = [];
    this.categorySelectedName = this.categories.find(a => a.categoryID == getCategoryIdFromEvent).categoryName
    this.nestSubCategorySelectedData = null;
  }

  // ------ getting sub categories ------

  showSubCategory = false;
  subCategories: any[] = [];
  subCategorySelectedName: string;
  getAllSubcategoires(filterCategoryId: number) {
    this.showSubCategory = true;
    this.subscription = this._subCategoriesService.GetAll().subscribe((data: any) => {
      this.subCategories = data.filter(a => a.categoryId == filterCategoryId);
    });
  }

  subCategorySelected(selectedSubCategoryIdEvent: Event) {
    this.selectedCategoriesProducts = [];
    let getSubCategoryIdFromEvent: number = +(selectedSubCategoryIdEvent.target as HTMLInputElement).value;
    this.getNestSubCategories(getSubCategoryIdFromEvent);
    this.subCategorySelectedName = this.subCategories.find(a => a.subCategoryID == getSubCategoryIdFromEvent).subCategoryName
    this.nestSubCategorySelectedData = null;
  }

  // ------ getting nest-sub-categories ------

  showNestSubCategory = false;
  nestSubCategories: any[] = [];
  nestSubCategorySelectedData: any;

  getNestSubCategories(filterSubCategoryId: number) {
    this.showNestSubCategory = true;
    this.subscription = this._nestSubCatgories.GetAll().subscribe((data: any) => {
      this.nestSubCategories = data.filter(a => a.subCategoryId == filterSubCategoryId);
    });

  }

  selectedNestSubCategories(selectedNestSubCategoryIdEvent: Event) {
    let getNestSubCategoryIdFromEvent: number = +(selectedNestSubCategoryIdEvent.target as HTMLInputElement).value;
    this.nestSubCategorySelectedData = this.nestSubCategories.find(a => a.nestSubCategoryID == getNestSubCategoryIdFromEvent);
    this.selectedCategoriesProducts = [];
    this.getProductsByNestCategory(this.nestSubCategorySelectedData?.nestSubCategoryID);
  }

  // fetching products by selected category

  selectedCategoriesProducts: any[] = [];
  getProductsByNestCategory(selectedNestCategoryId: number) {
    this.subscription = this._productDiscountDealsService.getSelectedNestCategoryProductList(selectedNestCategoryId).subscribe((data: any) => {
      this.selectedCategoriesProducts = data;
    })
  }

  // changing product price

  // selected product open model for set up the discount price
  addingDiscountToProduct = false;
  productAddedToDiscount = false;
  beforeDiscountPrice = 0;
  afterDiscountPrice = 0;
  selectedProductForDiscountObj: any;
  addingProductDiscount(selectedProductObj: any) {
    this.addingDiscountToProduct = true;
    this.beforeDiscountPrice = selectedProductObj.productPrice
    this.selectedProductForDiscountObj = selectedProductObj;
  }


  clearInput = '';
  percentageAdded = 0;
  changeProductPercentageHandler(percentage: number) {
    let givingPercentage = percentage;
    let convertPercentageToDecimal = givingPercentage / 100;
    let subtractingGivenPercentageFromProduct = convertPercentageToDecimal * this.beforeDiscountPrice;
    this.afterDiscountPrice = Math.ceil(this.beforeDiscountPrice - subtractingGivenPercentageFromProduct);
    this.percentageAdded = percentage;
  }

  applyDiscountOnSingleProduct() {
    let findingObjIndex = this.selectedCategoriesProducts.findIndex(a => a == this.selectedProductForDiscountObj);
    console.log(this.selectedCategoriesProducts[findingObjIndex].productPrice);
    let addingDiscountPriceProperty = { ...this.selectedProductForDiscountObj, beforePrice: this.selectedCategoriesProducts[findingObjIndex].productPrice, afterPrice: this.afterDiscountPrice, discountPercentage: this.percentageAdded, newProductAddToOldList: true };
    this.selectedCategoriesProducts.splice(findingObjIndex, 1);
    this.selectedProductsInDeal.push(addingDiscountPriceProperty);
    this.updateProductsInDeal.push(addingDiscountPriceProperty);
    this.addingDiscountToProduct = false;
    this.afterDiscountPrice = 0;
    this.clearInput = '';
  }


  DeleteProductFromDeals(selectedProduct) {
    delete selectedProduct['discountProductPrice'];
    delete selectedProduct['percentageVal'];
    this.selectedCategoriesProducts.push(selectedProduct);
    let findingObjIndex = this.selectedProductsInDeal.findIndex(a => a == selectedProduct);
    this.selectedProductsInDeal.splice(findingObjIndex, 1);
    let findingObjIndexInUpdateArr = this.updateProductsInDeal.findIndex(a => a == selectedProduct);
    this.updateProductsInDeal.splice(findingObjIndexInUpdateArr, 1);
  }

  removeErrorMessage() {
    this.addingDiscountToProduct = false;
    this.afterDiscountPrice = 0;
    this.clearInput = '';
  }

  updateProductsInDeal: any[] = [];
  submitUpdateProductDeals() {
    console.log(this.updateProductsInDeal);

    let customizingRequestData = {
      expireAt: this.updateProductDealsForm.value['expire_at'],
      dealName: this.updateProductDealsForm.value['dealName'],
      discountDealId: this._activatedRouter.snapshot.params['id'],
      updateProductDiscountDealList: [],
    }

    for (var singleProduct of this.updateProductsInDeal) {
      let productDiscountDeal = {
        productBeforePrice: singleProduct.beforePrice,
        productAfterDiscountPrice: singleProduct.afterPrice,
        productPercentage: singleProduct.discountPercentage,
        discountDealId: this._activatedRouter.snapshot.params['id'],
        productId: singleProduct.productId,
      };
      customizingRequestData.updateProductDiscountDealList.push(productDiscountDeal);
    }

    console.log(customizingRequestData);

    this._productDiscountDealsService.updateSingleDealProducts(customizingRequestData).subscribe((data: any) => {
      this._route.navigate(['/Admin/Product-discount-deals']);
    })

  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
