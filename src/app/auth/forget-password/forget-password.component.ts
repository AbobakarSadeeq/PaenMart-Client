import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordError = null;
  tokenFound = true;




  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  forgetPasswordData(enteredEmail: any) {

    this.forgetPasswordError = null;
    if (!enteredEmail?.email.includes("@gmail.com")) {
      this.forgetPasswordError = "Please write the correct gmail"
      return;
    }

    this._authService.forgetPassword({ email: enteredEmail.email }).subscribe((data: any) => {
        this.tokenFound = false;
    },
      (error: HttpErrorResponse) => {
        this.forgetPasswordError = error.error;
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tokenFound = false;
  }
}
