import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { NestSubCategoryService } from '../../products-menu/nest-sub-category/nest-sub-category.service';
import { SubCategoryService } from '../../products-menu/sub-category/sub-category.service';
import { ProductBrandService } from '../product-brand/product-brand.service';
import { BrandWithNestCategoryService } from './brand-with-nest-category.service';

@Component({
  selector: 'app-brand-with-nest-category',
  templateUrl: './brand-with-nest-category.component.html',
  styleUrls: ['./brand-with-nest-category.component.css']
})
export class BrandWithNestCategoryComponent implements OnInit {

  getStyleFromNav: string = null;
  subscription: Subscription;
  insertSuccessMessage = null;
  errorMessageInsert: any = null;

  listBothData: any[] = [];

  displayAddProductBrandAndNestCategoryModel: any;


  constructor(private _adminService: AdminService,
    private _brandWithNestCategoryService: BrandWithNestCategoryService,
    private _fb: FormBuilder, private DialogService: ConfirmationService,
    private _categoryService: CategoryService,
    private _subCategoriesService: SubCategoryService,
    private _nestSubCatgories: NestSubCategoryService,
    private _brandService: ProductBrandService,
  ) { }


  ngOnInit(): void {


    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getBrandWithNestCategoryList();
  }

  // Getting List Data
  getBrandWithNestCategoryList() {
    this.listBothData = [];
    this.subscription = this._brandWithNestCategoryService.getListBrandsNestCategories().subscribe((data: any) => {
      data.forEach(element => {
        this.listBothData.push(
          { brandName: element.brandName, nestSubCategoryWithBrands: element.nestSubCategoryWithBrands, toggleShow: false }
        );
      });

    })


    this.getAllCategories();
    this.gettingBrandData();

  }

  showExpensionData(indexArr: number) {
    this.listBothData[indexArr].toggleShow = !this.listBothData[indexArr].toggleShow;
  }

  onDeleteNestSingleCategory(data: any, indexSelected: number) {
    let viewModel = {
      productBrandId: data[indexSelected].brandId,
      nestSubCategoryId: data[indexSelected].nestCategoryId
    };
    this._brandWithNestCategoryService.DeleteData(viewModel).subscribe(() => {
      this.getBrandWithNestCategoryList();
    });
  }


  // Insert Nest and brand

  // ------ Categoires-Selecting ------
  selectedCategoiresNames = false;
  categoriesSelectingDone = true;
  submitCategoiresBtn = true;

  // ------ Getting Categories ------
  categories: any[] = [];
  categorySelectedName: string;
  showCategory = false;
  getAllCategories() {
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
  }


  categorySelected(selectedCategoryIdEvent: Event) {
    let getCategoryIdFromEvent: number = +(selectedCategoryIdEvent.target as HTMLInputElement).value;
    this.getAllSubcategoires(getCategoryIdFromEvent);
    this.nestSubCategories = [];
    this.categorySelectedName = this.categories.find(a => a.categoryID == getCategoryIdFromEvent).categoryName;
    this.nestSubCategorySelectedData = null;
    this.submitCategoiresBtn = true;
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
    let getSubCategoryIdFromEvent: number = +(selectedSubCategoryIdEvent.target as HTMLInputElement).value;
    this.getNestSubCategories(getSubCategoryIdFromEvent);
    this.subCategorySelectedName = this.subCategories.find(a => a.subCategoryID == getSubCategoryIdFromEvent).subCategoryName
    this.nestSubCategorySelectedData = null;
    this.submitCategoiresBtn = true;
  }

  // ------ getting nest-sub-categories ------

  showNestSubCategory = false;
  nestSubCategories: any[] = [];
  nestSubCategorySelectedData: any;

  getNestSubCategories(filterSubCategoryId: number) {
    this.showNestSubCategory = true;
    this.subscription = this._nestSubCatgories.GetAll().subscribe((data: any) => {
      this.nestSubCategories = data.filter(a => a.subCategoryId == filterSubCategoryId);
      for (var indexArr = 0; indexArr < this.nestSubCategories.length; indexArr++) {
        let foundNestCategoryInList = {
          nestSubCategoryID: this.nestSubCategories[indexArr].nestSubCategoryID,
          nestSubCategoryName: this.nestSubCategories[indexArr].nestSubCategoryName,
          subCategoryId: this.nestSubCategories[indexArr].subCategoryId,
          subCategoryName: this.nestSubCategories[indexArr].subCategoryName, foundInList: false
        };
        this.nestSubCategories[indexArr] = foundNestCategoryInList;


      }
    });
  }


  selectedNestSubCategories(selectedNestSubCategoryIdEvent: Event) {
    let getNestSubCategoryIdFromEvent: number = +(selectedNestSubCategoryIdEvent.target as HTMLInputElement).value;
    this.nestSubCategorySelectedData = this.nestSubCategories.find(a => a.nestSubCategoryID == getNestSubCategoryIdFromEvent);
    this.submitCategoiresBtn = false;

  }

  // Brand selecting

  brandList: any[] = [];
  gettingBrandData() {
    this.subscription = this._brandService.GetAll().subscribe((data: any) => {
      this.brandList = data;
    })
  }

  brandIdSelected: number;
  onChangeBrandData(selectedBrand: Event) {
    this.brandIdSelected = +(selectedBrand.target as HTMLInputElement).value;
    this.showCategory = true;
    this.categories = [];
    this.subCategories = [];
    this.showSubCategory = false;
    this.showNestSubCategory = false;
    this.submitCategoiresBtn = true;
    this.getAllCategories();

  }




  showProductBrandModel() {
    this.displayAddProductBrandAndNestCategoryModel = true;
    this.gettingBrandData();
  }


  // saving nest sub category in brands

  onSave() {
    let customObj = {
      nestSubCategoryId: this.nestSubCategorySelectedData.nestSubCategoryID,
      productBrandId: this.brandIdSelected
    }

    this._brandWithNestCategoryService.InsertData(customObj).subscribe(() => {
      this.getBrandWithNestCategoryList();
      this.insertSuccessMessage = "Category has added to the brand";
      setTimeout(() => {
        this.insertSuccessMessage = null;
      }, 2000)


    }, (error: any) => {
      this.errorMessageInsert = "Cannot do process because category already found in product brand";
       setTimeout(() => {
      this.errorMessageInsert = null;
    }, 3000)
    });


    this.displayAddProductBrandAndNestCategoryModel = false;
  }


  cleanForm() {
    this.selectedCategoiresNames = false;
    this.categoriesSelectingDone = true;
    this.categories = [];
    this.subCategories = [];
    this.showSubCategory = false;
    this.nestSubCategories = [];
    this.showNestSubCategory = false;
    this.submitCategoiresBtn = true;
    this.showCategory = false;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
