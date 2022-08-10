import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { ShipperPaymentService } from './shipper-payment.service';

@Component({
  selector: 'app-shipper-payment',
  templateUrl: './shipper-payment.component.html',
  styleUrls: ['./shipper-payment.component.css']
})

export class ShipperPaymentComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;

  constructor(private _adminService: AdminService,
    private _fb: FormBuilder, private DialogService: ConfirmationService,
    private _ShipperPayment: ShipperPaymentService) { }

  ngOnInit(): void {



    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.getShippersPendingPayment();

  }

  ShippersPendingPayment: any[] = [];
  getShippersPendingPayment() {
    this.subscription = this._ShipperPayment.getShippersPayment().subscribe((data: any) => {
      this.ShippersPendingPayment = data;
    })
  }

  // paying Shipper

  paymentDoneMsg = null;
  paymentErrorMsg = null;

  PayingShipperSalary(shipperPaymentId: number, shipperName: string) {
    this.DialogService.confirm({
      message: 'Are you sure you want to pay ' + shipperName + ' monthly salary? ',
      accept: () => {
        this._ShipperPayment.payingShipper(shipperPaymentId).subscribe((data: any) => {
          this.getShippersPendingPayment();
          this.paymentDoneMsg = "Shipper payment done and also email is sended";
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

  // paid Shippers

  paidShippers: any[] = [];
  getCurrentMonthPaidShippers() {
    this.subscription = this._ShipperPayment.getPaidShipper().subscribe((data: any) => {
      this.paidShippers = data;
    })
  }

  undoShipperPayment = null;
  AgainPayingShipperSalary(shipperPaymentId: number, shipperName: string) {
    this.DialogService.confirm({
      message: 'Are you sure you are want to undo Shipper payment?',
      accept: () => {
        this._ShipperPayment.againPayingShipper(shipperPaymentId).subscribe((data: any) => {
          this.getCurrentMonthPaidShippers();
        });
        this.undoShipperPayment = "Undo Shipper Payment sucessfully done."
        setTimeout(() => {
          this.undoShipperPayment = null;
        }, 3500)
      }
    });
  }

  ShipperPaymentHistory: any[] = [];
  paymentHistoryCount = 0;

  GetShipperPaymentHistory(pageNo: number) {
    this._ShipperPayment.getAllShipperPaymentHistoryList(pageNo).subscribe((data: any) => {
      this.ShipperPaymentHistory = data.shipperPaymentData;
      this.paymentHistoryCount = data.count;
    })
  }


  tablePageNoChange(pageNo: number) {
    this.ShipperPaymentHistory = [];
    this._ShipperPayment.getAllShipperPaymentHistoryList(pageNo).subscribe((data: any) => {
      this.ShipperPaymentHistory = data.ShipperPaymentData;
      this.paymentHistoryCount = data.count;
    })
  }




  changePaymentTab(event: any) {
    if (event.index == 0) {
      this.getShippersPendingPayment();


    } else if (event.index == 1) {
      this.getCurrentMonthPaidShippers();


    } else if (event.index == 2) {
      this.GetShipperPaymentHistory(1);

    }
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
