import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _authService: AuthService, private _activatedRoute: ActivatedRoute,
    private _route: Router) { }

  ngOnInit(): void {


    if (this._activatedRoute.snapshot.queryParamMap.get('email') && this._activatedRoute.snapshot.queryParamMap.get('token')) {
      console.log("Yes");

    } else {
      this._route.navigate(['/Auth']);
    }

  }

  ResetPasswordData(resetData: any) {
    let passwordResetObj = {
      email: this._activatedRoute.snapshot.queryParamMap.get('email'),
      token: this._activatedRoute.snapshot.queryParamMap.get('token'),
      password: resetData.Password
    }

    this._authService.newPasswordRequest(passwordResetObj).subscribe((data: any) => {
      this._route.navigate(['/Auth'], { queryParams: { passwordReset: true } });
    });

  }

}
