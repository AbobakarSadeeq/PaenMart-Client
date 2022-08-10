import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserRolesService } from '../../user-roles.service';

interface student {
  id: number,
  name: string
}

@Component({
  selector: 'app-edit-user-in-role',
  templateUrl: './edit-user-in-role.component.html',
  styleUrls: ['./edit-user-in-role.component.css']
})
export class EditUserInRoleComponent implements OnInit {

  showIndicator = false;
  userAllData: any[] = [];
  subscription: Subscription;
  formData: FormGroup;
  roleName:string;
  multipleAdminErrormsg:any = null;

  constructor(private fb: FormBuilder, private _authService: AuthService, private _activateRoute: ActivatedRoute, private route: Router, private _userRole: UserRolesService) { }

  ngOnInit(): void {


    const findId = this._activateRoute.snapshot.params['id'];
	  this.subscription =   this._userRole.getDataById(findId).subscribe((myData:any)=>{
      this.roleName = myData.roleName;
    });

    this.subscription = this._userRole.getEditUserRole(findId).subscribe((Data: any) => {
      this.userAllData = Data;
    });





    this.subscription = this._authService.loadingSpinnerLogOut.subscribe((data: any) => {
      this.showIndicator = data;
    });
  }
  onChange(changeData: any) {
    const findingIndex = this.userAllData.indexOf(changeData);
    if (this.userAllData[findingIndex].isSelected == true) {
      this.userAllData[findingIndex].isSelected = false;
    } else {
      this.userAllData[findingIndex].isSelected = true;

    }

  }

  updateSubmitUsersRole() {
    debugger;
    const formFrom = new FormData();

    if(this.roleName == "Admin"){
      if(this.userAllData.filter(a=>a.isSelected == true).length == 1){
        for (let i = 0; i < this.userAllData.length; i++) {
          formFrom.append(`model[${i.toString()}].userId`, this.userAllData[i].userId);
          formFrom.append(`model[${i.toString()}].userEmail`, this.userAllData[i].userEmail);
          formFrom.append(`model[${i.toString()}].isSelected`, this.userAllData[i].isSelected);
        }

        this.showIndicator = true;
        this._userRole.editUserRole(formFrom, this._activateRoute.snapshot.params['id']).subscribe(() => {
          setTimeout(() => { this.showIndicator = false }, 3000);
          this.route.navigate(["Auth"]);
          localStorage.removeItem('token');
        });

      }else{
        // if multiple selected then show an error
        this.multipleAdminErrormsg = "Sorry admin is only one allow";
      }
    }else{

      for (let i = 0; i < this.userAllData.length; i++) {
        formFrom.append(`model[${i.toString()}].userId`, this.userAllData[i].userId);
        formFrom.append(`model[${i.toString()}].userEmail`, this.userAllData[i].userEmail);
        formFrom.append(`model[${i.toString()}].isSelected`, this.userAllData[i].isSelected);
      }

      this.showIndicator = true;
      this._userRole.editUserRole(formFrom, this._activateRoute.snapshot.params['id']).subscribe(() => {
        setTimeout(() => { this.showIndicator = false }, 3000);
        this.route.navigate(["/Admin/UserRoles"]);
      });
    }




  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
