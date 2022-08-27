import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./navbar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NavbarComponent implements OnInit {
  subscription: Subscription;

  categories: any[] = [];
  subCategories: any[] = [];
  searchState: string = "";

  numberOfItemsInCart = 0;
  userDetails: any;
  imageValue: any;

  constructor(private _categoryService: CategoryService,
    private _subCategoryService: SubCategoryService,
    private _nestSubCategoryService: NestSubCategoryService,
    private _shoppingCartService: ShoppingCartService,
    private _AuthService: AuthService,
    private authorizedImage: AuthorizedImagesService,
    private _activateRoute: ActivatedRoute,
    private _httpRoute: Router,
    private _eref: ElementRef) {

  }





  ngOnInit(): void {
    this.cartItemFunc();

    if (this._activateRoute.snapshot.queryParamMap.has('searchingData')) {
      this.searchState = this._activateRoute.snapshot.queryParamMap.get('searchingData');
    }


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



  showSearchHistoryArr: string[] = [];
  SearchValue(searchItem: string) {
    this.showSearchHistory = false;
    if (searchItem == "") {
      return;
    }

    let searchHistoryArrState: any = [];
    if (localStorage.getItem("SearchHistory")) {
      searchHistoryArrState = JSON.parse(localStorage.getItem("SearchHistory"));

      if (searchHistoryArrState.indexOf(searchItem) == -1) {
        searchHistoryArrState.push(searchItem);
        this.showSearchHistoryArr = searchHistoryArrState;
        localStorage.setItem("SearchHistory", JSON.stringify(searchHistoryArrState));
      }
    } else {
      searchHistoryArrState.push(searchItem);
      this.showSearchHistoryArr = searchHistoryArrState;
      localStorage.setItem("SearchHistory", JSON.stringify(searchHistoryArrState));

    }

    this.searchState = searchItem;

    this._httpRoute.navigate(["/Products/Search"], { queryParams: { searchingData: searchItem } });


  }

  changeSelectSearchHistory(selectValueSearch: string) {
    this.SearchValue(selectValueSearch);
  }

  showSearchHistory = false;
  showHistoryHandlerToggle() {
    this.showSearchHistory = true;
  }

  @HostListener('document:click', ['$event.target'])
  customBlur(target: any) {
    // blur does not execute the li click event but this it works here
    if (target.tagName != 'INPUT')
      this.showSearchHistory = false;
    else {
      if (localStorage.getItem("SearchHistory")) {
        let convertToArr: [] = JSON.parse(localStorage.getItem("SearchHistory"));
        let getLastTenSearches = convertToArr.slice(-10);
        this.showSearchHistoryArr = [];
        for (var i = getLastTenSearches.length - 1; i > -1; i--) {
          this.showSearchHistoryArr.push(getLastTenSearches[i])
        }
      }
    }

  }


  openAdminSidePanel() {
    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));

    if (payload.role == 'Admin') {
      this._httpRoute.navigate(['/Admin'])
    } else if (payload.role == 'Employee') {
      this._httpRoute.navigate(['/Admin/PendingUserOrders']);
    } else if (payload.role == 'Shipper') {
      this._httpRoute.navigate(['/Admin/Shipper/ShipperPendingOrders']);
    }

  }


  changeSearchData() {
    this.showSearchHistory = false;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}

