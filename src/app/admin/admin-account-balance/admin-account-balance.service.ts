import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountBalanceService {

  constructor(private http: HttpClient) { }

  GetAccountBalance() {
    return this.http.get(environment.adminAccountBalanceUrl);
  }

  AddAccountBalance(data: any) {
    return this.http.post(environment.adminAccountBalanceUrl, data);
  }

  GetAdminAccountInfo(data: any) {
    return this.http.post(environment.accountApiUrl + "/GetUserProfile", data);
  }

  GetAccountTransactions(numberTransaction: any): Observable<any> {
    return this.http.get(environment.adminAccountBalanceUrl + "/GetAccountTransaction/" + numberTransaction);

  }

}
