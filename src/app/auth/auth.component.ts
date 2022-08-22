import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  //Fields

  errorMessage: any = null;
  isLoginMode = true;
  successFullInsert: any = null;
  myUserDataaa: any;

  showPasswordResetMsg = null;
  //Constructor
  constructor(private _AuthService: AuthService, private httpRoute: Router, private activateRoute: ActivatedRoute) { }

  //Switching Sign In and Sign Up Method
  onSwitchMode(clearData: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    clearData.reset();
  }




  public subscribtion: Subscription;

  ngOnInit(): void {
    //if the user Already LogIn then he/she dont to sign in Again


    if (localStorage.getItem('token') != null) {
      this.httpRoute.navigate(['/']);
    }

    if (this.activateRoute.snapshot.queryParamMap.has('passwordReset')) {
      this.showPasswordResetMsg = "Password has been reset sucessfully done";


      setTimeout(() => {
        this.showPasswordResetMsg = null;
      }, 3500)

    }




  }
  //Removing the Error from screen when it occurs
  removeErrorEvent() {
    this.errorMessage = null;
    this.successFullInsert = null;
  }



  //Register An Account in the Database And Also Sign In
  loadingIndicator = false;
  emailValidaton = false;

  authFormData(ngFormData: NgForm) {


    if (this.isLoginMode) {
      //Log In
      //  this.loadingIndicator = true;
      this._AuthService.logIn(ngFormData.value).pipe(delay(1000)).subscribe((responseData: any) => {
        let gettingImageUrl = responseData.photoUrl ? responseData.photoUrl : "../../assets/No Image.jpg";
        localStorage.setItem('token', responseData.token);
        localStorage.setItem("photoUrl", gettingImageUrl);
        debugger;

        if (this.activateRoute.snapshot.queryParamMap.has('orderReview')) {
          this.httpRoute.navigate(['/Client/Reviews']);
        }else {
          this.httpRoute.navigate(['/']);

        }


      },
        (errorResponse: HttpErrorResponse) => {
          setTimeout(() => { this.loadingIndicator = false }, 2000);
          setTimeout(() => {
            if (errorResponse.status == 400) {
              this.errorMessage = "Incorrect Email or password!", "Authentication failed";
            } else if (errorResponse.status == 0) {
              this.errorMessage = "Your server is offline olease come back when it to back online thank you!";
            }
            else {
            }
          }, 2000);


        }
      );

    }
    else {
      //Sign Up

      if (!ngFormData.value['Email'].includes("@gmail.com")) {
        this.emailValidaton = true;
        return;
      }

      this.emailValidaton = false;
      //   this.loadingIndicator = true;
      this._AuthService.SignUp(ngFormData.value).pipe(delay(1000)).subscribe((response: any) => {
        this.successFullInsert = "Sign up operation SuccessFull! and now please log in";
        //    this.loadingIndicator = false;
      },
        (errorResponse: HttpErrorResponse) => {
          setTimeout(() => {
            this.loadingIndicator = false
            this.errorMessage = errorResponse.error;

          }, 2000);
        }
      );
    }

  }

}


