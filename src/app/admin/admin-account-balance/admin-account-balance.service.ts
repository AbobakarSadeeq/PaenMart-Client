import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountBalanceService {

  constructor(private http: HttpClient) { }

  GetAccountBalance() {
    return this.http.get("https://localhost:44300/api/AdminAccountBalance");
  }

  AddAccountBalance(data: any) {
    return this.http.post("https://localhost:44300/api/AdminAccountBalance", data);
  }

  GetAdminAccountInfo(data: any) {
    return this.http.post("https://localhost:44300/api/Account/GetUserProfile", data);
  }

  GetAccountTransactions(numberTransaction:any): Observable<any> {
    return this.http.get("https://localhost:44300/api/AdminAccountBalance/GetAccountTransaction/" + numberTransaction);

  }

}
