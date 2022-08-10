import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { CategoryService } from '../products-menu/category/category.service';
import { AdminAccountBalanceService } from './admin-account-balance.service';

@Component({
  selector: 'app-admin-account-balance',
  templateUrl: './admin-account-balance.component.html',
  styleUrls: ['./admin-account-balance.component.css']
})
export class AdminAccountBalanceComponent implements OnInit {

  getStyleFromNav: string = null;
  subscription: Subscription;
  accountDetails: any;
  userDetails: any;
  accountBalanceFormData: FormGroup;


  constructor(private _adminService: AdminService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private DialogService: ConfirmationService,
    private _adminAccountBalanceService: AdminAccountBalanceService) { }

  ngOnInit(): void {

    this.accountBalanceFormData = this._fb.group({
      currentBalance: ['', [Validators.required]]
    });

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    // Get Admin account info

    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    this.subscription = this._adminAccountBalanceService.GetAdminAccountInfo({ token: localStorage.getItem('token') }).subscribe((data: any) => {
      this.userDetails = data;
    })

    // Get account balance

    this._adminAccountBalanceService.GetAccountBalance().subscribe((data: any) => {
      this.accountDetails = data;

      if (data.userId != payload.UserID && payload.role == "Admin") {
        // add admin account entry
        let adminAccountObj = {
          currentBalance: data.currentBalance,
          beforeBalance: data.beforeBalance,
          transactionPurpose: "Admin changed",
          balanceSituation: "Same old",
          userId: payload.UserID,
        };
        this._adminAccountBalanceService.AddAccountBalance(adminAccountObj).subscribe((data: any) => {
          this.GetCurrentAccountBalance();
        });
      }


    });


  }

  GetCurrentAccountBalance() {
    this._adminAccountBalanceService.GetAccountBalance().subscribe((data: any) => {
      this.accountDetails = data;
    });
  }

  displayAddAccountBalance = false;
  showAccountBalanceModel() {
    this.displayAddAccountBalance = true;

    this.accountBalanceFormData = this._fb.group({
      currentBalance: [this.accountDetails.currentBalance, [Validators.required]]
    });

  }

  AddingAccountNewEntryTransaction() {
    debugger;
    if (this.accountBalanceFormData.value['currentBalance'] == this.accountDetails.currentBalance) {
      return;
    }
    let adminAccountObj = {
      currentBalance: this.accountBalanceFormData.value['currentBalance'],
      beforeBalance: this.accountDetails.currentBalance, // this is not related with the edition of account
      transactionPurpose: "Admin edit balance",
      balanceSituation: this.accountBalanceFormData.value['currentBalance'] > this.accountDetails.currentBalance ? "Add" : "Subtract",
      userId: this.userDetails.id
    };
    this._adminAccountBalanceService.AddAccountBalance(adminAccountObj).subscribe((data: any) => {
      this.GetCurrentAccountBalance();
    });
    this.displayAddAccountBalance = false;
    this.GetAdminCurrentAccountTransaction(5);

  }

  removeErrorMessage() {
    this.displayAddAccountBalance = false;
  }


  AccountTransactions: any[] = [];
  showTransactionTable = false;
  GetAdminCurrentAccountTransaction(event: any) {
    this.showTransactionTable = true;
    this.subscription = this._adminAccountBalanceService.GetAccountTransactions(event.target.value).subscribe((data: any) => {
      this.AccountTransactions = data;
    });
  }

}
