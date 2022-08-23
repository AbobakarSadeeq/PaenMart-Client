import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from '../../admin.service';
import { UserRolesService } from './user-roles.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  showIndicator = false;
  listNull: any = null;
  successFullInsert: any = null;
  listRole: any[] = [];
  roleUsed: any = null;
  getStyleFromNav: string = null;

  subscription: Subscription;

  constructor(private _UserRoles: UserRolesService,
     private _authService: AuthService,
      private DialogService: ConfirmationService,
      private _adminService:AdminService) { }

  ngOnInit(): void {

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });


    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });

    this.allListRole();
  }

  // GetAll Role for Admin
  allListRole() {
    this.subscription = this._UserRoles.getListRole().subscribe((data: any) => {
      if (data == null) {
        this.listNull = "Sorry! No Role is Found in the Server Please Add it"
      }
      this.listRole = data;
    });
  }


  // Adding Role through by Admin and if the role is already exist in the database then show error.
  creatingRoles(data: NgForm) {
    this._UserRoles.creatingRole(data.value).subscribe(() => {
      this.successFullInsert = "Role Has been Added";
      this.allListRole();
    },
      (roleCreateError: HttpErrorResponse) => {
        this.roleUsed = roleCreateError.error;
      });
    data.reset();
  }

  // used for to remove the Effects or animation, when Role Added or remove or already exist
  removeErrorEventEffects() {
    this.listNull = null;
    this.roleUsed = null;
    this.successFullInsert = null;
  }

  // Remove the Role From Database
  deleteRole(roleDeleteId: any) {

  }


  openDeleteDialogConfarmation(dataId: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Role?',
      accept: () => {
        this.showIndicator = true;
        this._UserRoles.DeleteingRole(dataId).subscribe(() => {
          this.allListRole();
          this.showIndicator = false;
        });
      }
    });

  }







  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
