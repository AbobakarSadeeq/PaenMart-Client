import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeePaymentService {

  constructor(private _http: HttpClient) { }

  getEmployeesPayment() {
    return this._http.get("https://localhost:44300/api/Users/GetEmployeesPendingPayment");
  }

  payingEmployee(employeePaymentId: number) {
    return this._http.put("https://localhost:44300/api/Users/PayingEmployeeMonthlyPayment/" + employeePaymentId, {});
  }

  getPaidEmployee() {
    return this._http.get("https://localhost:44300/api/Users/PaidEmployeesList");
  }

  againPayingEmployee(employeePaymentId: number) {
    return this._http.put("https://localhost:44300/api/Users/PayingEmployeeMonthlyPaymentAgainApplying/" + employeePaymentId, {});
  }

  getAllEmployeePaymentHistoryList(pageNo:number){
    return this._http.get("https://localhost:44300/api/Users/EmployeePaymentHistory/" + pageNo);
  }

}
