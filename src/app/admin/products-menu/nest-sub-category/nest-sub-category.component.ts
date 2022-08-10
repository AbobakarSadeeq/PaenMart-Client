import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../category/category.service';
import { SubCategoryService } from '../sub-category/sub-category.service';
import { NestSubCategoryService } from './nest-sub-category.service';

@Component({
  selector: 'app-nest-sub-category',
  templateUrl: './nest-sub-category.component.html',
  styleUrls: ['./nest-sub-category.component.css']
})
export class NestSubCategoryComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;

  displayAddNestSubCategoryModel = false;
  displayUpdateNestSubCategoryModel = false;
  showSubCategory = false;

  categories: any[] = [];
  subCategories: any[] = [];
  nestSubCategories: any[] = [];
  nestSubCategoryFormData: FormGroup;

  constructor(private _adminService: AdminService,
    private _nestSubCategoryService: NestSubCategoryService,
    private _fb: FormBuilder,
    private DialogService: ConfirmationService,
    private _subCategoryService: SubCategoryService,
    private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.nestSubCategoryFormData = this._fb.group({
      nestSubCategoryName: ['', [Validators.required]],
      subCategoryId: [null, [Validators.required]]
    });

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getNestSubCategories();
  }

  getNestSubCategories() {
    this.subscription = this._nestSubCategoryService.GetAll().subscribe((data: any) => {
      this.nestSubCategories = data;
      console.log(data);
    });
  }

  // Adding Nest Sub category
  showAddNestSubCategoryModel() {
    this.displayAddNestSubCategoryModel = true;
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })


  }
  onChangeCategory(event: Event) {
    let singleCategoryId =  +(event.target as HTMLInputElement).value;
    this.showSubCategory = true;
    this.subscription = this._subCategoryService.GetAll().subscribe((data: any) => {
      this.subCategories = data.filter(a=>a.categoryId == singleCategoryId);
    });
  }

  onSaveNestSubCategory() {
    this._nestSubCategoryService.Insert(this.nestSubCategoryFormData.value).subscribe(() => {
      this.getNestSubCategories();
    });
    this.displayAddNestSubCategoryModel = false;
    this.removeErrorMessageAndResetForm();
  }

  // Deleting sub category

  onDeleteNestSubCategory(nestSubCategoryId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Nest-Sub-Category?',
      accept: () => {
        this._nestSubCategoryService.DeleteData(nestSubCategoryId).subscribe((data: any) => {
          this.getNestSubCategories();
        })
      }
    });
  }

  // update nest sub category
  getDataForUpdate(nestSubCategoryId: number) {
    this.displayUpdateNestSubCategoryModel = true;



    this.subscription = this._subCategoryService.GetAll().subscribe((data: any) => {
      this.subCategories = data;
    });



    this.subscription = this._nestSubCategoryService.get(nestSubCategoryId).subscribe((data: any) => {
      this.nestSubCategoryFormData = this._fb.group({
        nestSubCategoryID: [data.nestSubCategoryID],
        nestSubCategoryName: [data.nestSubCategoryName],
        subCategoryId: [data.subCategoryId]
      })
    });

    this.nestSubCategoryFormData.reset();
  }

  onUpdateNestSubCategory() {
    this.subscription = this._nestSubCategoryService.UpdateData(this.nestSubCategoryFormData.value).subscribe(() => {
      this.getNestSubCategories();
    })
    this.removeErrorMessageAndResetForm();
    this.displayUpdateNestSubCategoryModel = false;
  }


  removeErrorMessageAndResetForm() {
    this.nestSubCategoryFormData.reset();
    this.showSubCategory = false;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
