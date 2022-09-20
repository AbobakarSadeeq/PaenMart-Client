import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { NestSubCategoryService } from '../../products-menu/nest-sub-category/nest-sub-category.service';
import { SubCategoryService } from '../../products-menu/sub-category/sub-category.service';
import { ProductDiscountDealsService } from '../product-discount-deals.service';

@Component({
  selector: 'app-add-product-deals',
  templateUrl: './add-product-deals.component.html',
  styleUrls: ['./add-product-deals.component.css']
})
export class AddProductDealsComponent implements OnInit {

  getStyleFromNav: string = null;
  subscription: Subscription;

  productDealsForm: FormGroup;
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


    this.productDealsForm = this.fb.group({
      dealName: ['', [Validators.required]],
      expire_at: ['', [Validators.required]],
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


  // selected product open model for set up the discount price
  addingDiscountToProduct = false;
  productAddedToDiscount = false;
  addProductToDiscountDeal(selectedProductObj: any) {
    console.log(selectedProductObj);
    this.addingDiscountToProduct = true;
  }

  applyDiscountOnSingleProduct() {
    // remove that object from array as well.
    // add that object to selected product for discount array.
  }








  submitProductDeals() {

  }

  removeErrorMessage() {
    this.addingDiscountToProduct = false;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
