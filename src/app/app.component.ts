import { Component } from '@angular/core';
import { delay, of, tap, timer } from 'rxjs';
import { ProductDiscountDealsService } from './admin/product-discount-deals/product-discount-deals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _productDiscountDealsService: ProductDiscountDealsService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // when discount deal add or update then it will be execute.
    this._productDiscountDealsService.expirationUpdate.subscribe((responseData: any) => {
      console.log("yes changesss");
      this.expiringDiscountDealAutomatically();
    });

    this.expiringDiscountDealAutomatically();
  }

  expiringDiscountDealAutomatically() {
    this._productDiscountDealsService.GetListForExpirationDiscountDeal().subscribe((data: any) => {
      if (data) {
        const expire_date = new Date(data.dealExpireAt);

        const futureTaskExecution$ = timer(1000).pipe(delay(expire_date));
        futureTaskExecution$.subscribe((x) => {
          console.log("Timer subscribed");
          this._productDiscountDealsService.ExpiringPostDiscountDeal(data.discountDealID).subscribe(() => {
            this.expiringDiscountDealAutomatically();
          });
        });

      } else {
        return;
      }


    })
  }

}




