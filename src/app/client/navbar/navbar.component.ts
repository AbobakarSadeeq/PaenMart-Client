import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/admin/products-menu/category/category.service';
import { NestSubCategoryService } from 'src/app/admin/products-menu/nest-sub-category/nest-sub-category.service';
import { SubCategoryService } from 'src/app/admin/products-menu/sub-category/sub-category.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthorizedImagesService } from 'src/app/auth/Edit profile/authorized-images/authorized-images.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;

  categories: any[] = [];
  subCategories: any[] = [];

  numberOfItemsInCart = 0;
  userDetails: any;
  imageValue: any;

  constructor(private _categoryService: CategoryService,
    private _subCategoryService: SubCategoryService,
    private _nestSubCategoryService: NestSubCategoryService,
    private _shoppingCartService: ShoppingCartService,
    private _AuthService: AuthService,
    private authorizedImage: AuthorizedImagesService,

    private _httpRoute: Router) { }

  ngOnInit(): void {
    this.cartItemFunc();

    // Subscribing the Cart Items Number
    this.subscription = this._shoppingCartService.cartItemsNumber.subscribe((data: any) => {
      this.numberOfItemsInCart = data
    })

    if (localStorage.getItem("token")) {
      if (!this.userDetails) {
        this.subscription = this._AuthService.GetLogInProfile({ token: localStorage.getItem("token") }).subscribe((data: any) => {
          this.userDetails = data;
        });
      }
    }


    // if we want parameter then will pass it.
    // this._httpRoute.navigate([], {
    //   queryParams: {
    //     userId: data.id
    //   }
    // });





    this._AuthService.profilePic.subscribe((data: any) => {
      this.imageValue = data;
    });

    this.imageValue = localStorage.getItem("photoUrl");




    this.getCategories();
  }

  getCategories() {
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
  }

  getSubCategories(categoryId: number) {

    this.subscription = this._subCategoryService.GetSubCategoriesByCategoryId(categoryId).subscribe((data: any[]) => {
      this.subCategories = data;
    });

  }

  cartItemFunc() {
    if (localStorage.getItem('ProductCartData') != null) {
      var cartValue: [] = JSON.parse(localStorage.getItem('ProductCartData')!);
      let quantitySum: number = 0;
      for (var gettingQuantity of cartValue) {
        quantitySum = quantitySum + gettingQuantity['quantity'];
      }
      this.numberOfItemsInCart = quantitySum;
    }
  }


  logOutUser() {
    this._AuthService.LogOut();
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}

