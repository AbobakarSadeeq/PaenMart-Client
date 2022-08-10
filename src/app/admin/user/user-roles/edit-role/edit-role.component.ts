import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRolesService } from '../user-roles.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  roleEditData: any = { id: undefined, roleName: undefined, users: undefined };
  errorMessage: any = null;

  showIndicator = false;
  subscription: Subscription;
  constructor(private _authService: AuthService, private _myRoute: Router, private _route: ActivatedRoute, private _userRole: UserRolesService) { }

  ngOnInit(): void {

    const findId = this._route.snapshot.params['id'];
    this.subscription = this._userRole.getDataById(findId).subscribe((myData: any) => {
      if (myData == null) {
        this._myRoute.navigate(['/notfound'])
      } else {
        this.roleEditData = myData;
      }
    });



    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });
  }

  //Updating Role:
  updateRole(formData: NgForm) {

    this._userRole.updateRoleData(formData.value).subscribe(() => {
      this._myRoute.navigate(['/Admin/UserRoles']);
    },
      (errors: HttpErrorResponse) => {
        this.errorMessage = errors.error;
      });
  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
