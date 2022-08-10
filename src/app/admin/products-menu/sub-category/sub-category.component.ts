import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../category/category.service';
import { SubCategoryService } from './sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  getStyleFromNav: string = null;
  subscription: Subscription;

  displayAddSubCategoryModel = false;
  displayUpdateSubCategoryModel = false;


  subCategories: any[] = [];
  categories: any[] = [];
  subCategoryFormData: FormGroup;


  constructor(private _adminService: AdminService,
    private _subCategoryService: SubCategoryService,
    private _fb: FormBuilder,
    private DialogService: ConfirmationService,
    private _categoryService: CategoryService) { }


  ngOnInit(): void {
    this.subCategoryFormData = this._fb.group({
      subCategoryName: ['', [Validators.required]],
      categoryId: [null, [Validators.required]]
    });



    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getSubCategories();
  }

  getSubCategories() {
    this.subscription = this._subCategoryService.GetAll().subscribe((data: any) => {
      this.subCategories = data;
    });
  }

  // Adding Sub category
  showAddSubCategoryModel() {
    this.displayAddSubCategoryModel = true;
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
  }

  onSaveSubCategory() {
    this._subCategoryService.Insert(this.subCategoryFormData.value).subscribe(() => {
      this.getSubCategories();
    });
    this.displayAddSubCategoryModel = false;
    this.removeErrorMessageAndResetForm();
  }


  // Deleting sub category

  onDeleteSubCategory(subCategoryId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Sub-Category?',
      accept: () => {
        this._subCategoryService.DeleteData(subCategoryId).subscribe((data: any) => {
          this.getSubCategories();
        })
      }
    });
  }

  // update sub category

  getDataForUpdate(subCategoryId: number) {
    this.displayUpdateSubCategoryModel = true;
    this.subscription = this._subCategoryService.GetSingleSubCategoryById(subCategoryId).subscribe((data:any)=>{
      this.subCategoryFormData = this._fb.group({
        subCategoryID:[data.subCategoryID],
        subCategoryName: [data.subCategoryName],
        categoryId: [data.categoryId]
      })
    });
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
    this.subCategoryFormData.reset();
  }

  onUpdateSubCategory() {
    this.subscription = this._subCategoryService.UpdateData(this.subCategoryFormData.value).subscribe(()=>{
      this.getSubCategories();
    })
    this.removeErrorMessageAndResetForm();
    this.displayUpdateSubCategoryModel = false;
  }


  removeErrorMessageAndResetForm() {
    this.subCategoryFormData.reset();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}


