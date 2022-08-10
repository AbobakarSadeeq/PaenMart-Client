import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from '../admin.service';
import { DynamicFormStructureService } from '../product-extra-info/dynamic-form-structure/dynamic-form-structure.service';
import { AdminHeaderService } from './admin-header.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  showSideBar = false;
  subscription: Subscription;

  productMenuDropDown = false;
  productExtraInfoDropDown = false;
  productDataDropDown = false;
  adminAccountAndPaymentsDropDown = false;
  projectExtraFeatures = false;
  userOrdersDropDown = false;
  usersDataDropDown = false;
  userDetails: any;
  userImg: any;


  dynamicFormStructure: any[] = [];
  convertStringToArrRole: any[] = [];

  constructor(private _adminService: AdminService,
    private _dynamicFormStructure: DynamicFormStructureService,
    private _adminHeaderService: AdminHeaderService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _AuthService: AuthService) {

  }

  ngOnInit(): void {

    // sendingData to dashboard/home
    this._adminService.userData.subscribe((data: any) => {

    })


    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    this.convertStringToArrRole = payload.role;

    if (localStorage.getItem("photoUrl")) {
      this.userImg = localStorage.getItem("photoUrl");
    }


    this._adminHeaderService.productFormAdded.subscribe((data: any) => {
      this.dynamicFormStructure.push(data);

    });


    this._adminService.sideBar.subscribe((data: string) => { });


    if (localStorage.getItem("token")) {

      this.subscription = this._AuthService.GetLogInProfile({ token: localStorage.getItem("token") }).subscribe((data: any) => {
        this.userDetails = data;

        // if we want parameter then will pass it.
        // this._httpRoute.navigate([], {
        //   queryParams: {
        //     userId: data.id
        //   }
        // });

        // sendingData to dashboard/home
        this._adminService.userData.next(data);

      });

    }



  }

  toggleMenuBtn() {
    this.showSideBar = !this.showSideBar;
    if (this.showSideBar) {
      this._adminService.sideBar.next("margin-left:225px");
    } else {
      this._adminService.sideBar.next(null);
      this._adminService.sideBar.next("margin-left: 0; width: 100%;");

    }
    this.getDynamicFormStructureList();

  }


  getDynamicFormStructureList() {
    this.subscription = this._dynamicFormStructure.GetAll().subscribe((data: any) => {
      this.dynamicFormStructure = data;
    });
  }

  logOutUser() {
    this._AuthService.LogOut();
  }


}


