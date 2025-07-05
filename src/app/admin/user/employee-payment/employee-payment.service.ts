import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeePaymentService {

  constructor(private _http: HttpClient) { }

  getEmployeesPayment() {
    return this._http.get(environment.usersApiUrl + "/GetEmployeesPendingPayment");
  }

  payingEmployee(employeePaymentId: number) {
    return this._http.put(environment.usersApiUrl + "/PayingEmployeeMonthlyPayment/" + employeePaymentId, {});
  }

  getPaidEmployee() {
    return this._http.get(environment.usersApiUrl + "/PaidEmployeesList");
  }

  againPayingEmployee(employeePaymentId: number) {
    return this._http.put(environment.usersApiUrl + "/PayingEmployeeMonthlyPaymentAgainApplying/" + employeePaymentId, {});
  }

  getAllEmployeePaymentHistoryList(pageNo: number) {
    return this._http.get(environment.usersApiUrl + "/EmployeePaymentHistory/" + pageNo);
  }


}
