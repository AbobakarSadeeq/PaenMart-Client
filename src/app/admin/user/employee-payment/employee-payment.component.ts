import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { AdminService } from '../../admin.service';
import { EmployeePaymentService } from './employee-payment.service';

@Component({
  selector: 'app-employee-payment',
  templateUrl: './employee-payment.component.html',
  styleUrls: ['./employee-payment.component.css']
})
export class EmployeePaymentComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;

  constructor(private _adminService: AdminService,
    private _fb: FormBuilder, private DialogService: ConfirmationService,
    private _EmployeePayment: EmployeePaymentService) { }

  ngOnInit(): void {



    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getEmployeesPendingPayment();

  }

  EmployeesPendingPayment: any[] = [];
  getEmployeesPendingPayment() {
    this.subscription = this._EmployeePayment.getEmployeesPayment().subscribe((data: any) => {
      this.EmployeesPendingPayment = data;
    })
  }

  // paying employee

  paymentDoneMsg = null;
  paymentErrorMsg = null;

  PayingEmployeeSalary(empPaymentId: number, empName: string) {
    this.DialogService.confirm({
      message: 'Are you sure you want to pay ' + empName + ' monthly salary? ',
      accept: () => {
        this._EmployeePayment.payingEmployee(empPaymentId).subscribe((data: any) => {
          this.getEmployeesPendingPayment();
          this.paymentDoneMsg = "Employee payment done and also email is sended";
          setTimeout(() => {
            this.paymentDoneMsg = null;
          }, 3500)
        },
          (httpError: HttpErrorResponse) => {
            this.paymentErrorMsg = httpError.error;
            setTimeout(() => {
              this.paymentErrorMsg = null;
            }, 3500)
          })
      }
    });

  }

  // paid employees

  paidEmployees: any[] = [];
  getCurrentMonthPaidEmployees() {
    this.subscription = this._EmployeePayment.getPaidEmployee().subscribe((data: any) => {
      this.paidEmployees = data;
    })
  }

  undoEmployeePayment = null;
  AgainPayingEmployeeSalary(empPaymentId: number, empName: string) {
    this.DialogService.confirm({
      message: 'Are you sure you are want to undo employee payment?',
      accept: () => {
        this._EmployeePayment.againPayingEmployee(empPaymentId).subscribe((data: any) => {
          this.getCurrentMonthPaidEmployees();
        });
        this.undoEmployeePayment = "Undo Employee Payment sucessfully done."
        setTimeout(() => {
          this.undoEmployeePayment = null;
        }, 3500)
      }
    });
  }

  employeePaymentHistory: any[] = [];
  paymentHistoryCount = 0;

  GetEmployeePaymentHistory(pageNo: number) {
    this._EmployeePayment.getAllEmployeePaymentHistoryList(pageNo).subscribe((data: any) => {
      this.employeePaymentHistory = data.employeePaymentData;
      this.paymentHistoryCount = data.count;
    })
  }


  tablePageNoChange(pageNo: number) {
    this.employeePaymentHistory = [];
    this._EmployeePayment.getAllEmployeePaymentHistoryList(pageNo).subscribe((data: any) => {
      this.employeePaymentHistory = data.employeePaymentData;
      this.paymentHistoryCount = data.count;
    })
  }




  changePaymentTab(event: any) {
    if (event.index == 0) {
      this.getEmployeesPendingPayment();


    } else if (event.index == 1) {
      this.getCurrentMonthPaidEmployees();


    } else if (event.index == 2) {
      this.GetEmployeePaymentHistory(1);

    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
