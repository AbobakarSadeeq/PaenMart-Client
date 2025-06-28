import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { debounceTime, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  decode: any; // this property used for in appRoleHas Directive.

  profileData = new Subject<any>();
  profilePic = new Subject<any>();
  loadingSpinnerLogOut = new Subject<any>();

  constructor(private httpRequest: HttpClient, private _route: Router) { }

  SignUp(data: any) {
    return this.httpRequest.post(environment.accountApiUrl, data);
  }

  logIn(data: any) {
    return this.httpRequest.post(`${environment.accountApiUrl}/LogIn`, data);
  }

  LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('photoUrl');
    this._route.navigate(["/Auth"]);
  }

  getUserCount() {
    return this.httpRequest.get(`${environment.accountApiUrl}/UserAccountCount`);
  }

  forgetPassword(data: any) {
    return this.httpRequest.post(`${environment.accountApiUrl}/ForgetPassword`, data);
  }

  newPasswordRequest(data: any) {
    return this.httpRequest.post(`${environment.accountApiUrl}/ResetPassword`, data);
  }

  //Getting the Data who's is LogIn
  GetLogInProfile(token: any) {
    var tokenHeaders = new HttpHeaders({ "Authorization": 'bearer ' + localStorage.getItem('token') })
    return this.httpRequest.post(`${environment.accountApiUrl}/GetUserProfile`, token, { headers: tokenHeaders });
  }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payload.role;
    var convertStringToArrRole = userRole.replace(" ", "").split(',');
    this.decode = convertStringToArrRole;
    allowedRoles.forEach((_element: any) => {
      if (convertStringToArrRole.find(a => a == _element)) {
        isMatch = true;
        return null;
      }
      return false;
    });
    return isMatch;


  }

  // User Address

  insertUserAddress(data: any) {
    return this.httpRequest.post(environment.userAddressApiUrl, data);
  }


  getUserAddress(dataId: any) {
    return this.httpRequest.get(`${environment.userAddressApiUrl}/${dataId}`);
  }


  updateUserAddress(data: any) {
    return this.httpRequest.put(environment.userAddressApiUrl, data);
  }

  // Countries and Cities
  getCities() {
    return this.httpRequest.get(environment.cityApiUrl);
  }

  getCountry() {
    return this.httpRequest.get(environment.countryApiUrl);
  }




}

