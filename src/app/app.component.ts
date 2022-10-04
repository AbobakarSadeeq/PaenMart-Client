import { Component } from '@angular/core';
import { delay, of, tap, timer } from 'rxjs';
import { ProductDiscountDealsService } from './admin/product-discount-deals/product-discount-deals.service';
import { LoadingSpinnerService } from './shared/services/loading-spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadingSpinnerShowValid = false;
  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {

    this.loadingSpinnerService.loadingSpinner.subscribe((data:any) => {
      this.loadingSpinnerShowValid = data;
    });


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // when discount deal add or update then it will be execute.


  }



}




