import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;

  displayAddCategoryModel = false;
  displayUpdateCategoryModel = false;


  categories: any[] = [];
  categoryFormData: FormGroup;


  constructor(private _adminService: AdminService, private _categoryService: CategoryService,
    private _fb: FormBuilder, private DialogService: ConfirmationService) { }

  ngOnInit(): void {

    this.categoryFormData = this._fb.group({
      categoryName: ['', [Validators.required]]
    });



    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getCategories();
  }

  getCategories() {
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    });

  }

  onSaveCategory() {
    this._categoryService.Insert(this.categoryFormData.value).subscribe(() => {
      this.getCategories();
    });
    this.displayAddCategoryModel = false;
    this.categoryFormData.reset();
  }

  onDeleteCategory(categoryId: number) {

    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Category?',
      accept: () => {
        this._categoryService.DeleteData(categoryId).subscribe((data: any) => {
          this.getCategories();
        })
      }
    });


  }

  getDataForUpdate(categoryId: number) {
    this.displayUpdateCategoryModel = true;
    this.subscription = this._categoryService.get(categoryId).subscribe((data: any) => {
      this.categoryFormData = this._fb.group({
        categoryID: [categoryId],
        categoryName: [data?.categoryName]
      });

    });


  }

  onUpdateCategory() {
    this.subscription = this._categoryService.UpdateData(this.categoryFormData.value).subscribe(() => {
      this.getCategories();
    });
    this.displayUpdateCategoryModel = false;
    this.removeErrorMessage();
  }


  showCategoryModel() {
    this.displayAddCategoryModel = true;
  }

  removeErrorMessage() {
    this.categoryFormData.reset();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
