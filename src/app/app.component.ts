import { Component } from '@angular/core';
import { delay, of, tap, timer } from 'rxjs';
import { ProductDiscountDealsService } from './admin/product-discount-deals/product-discount-deals.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }

  ngOnInit(): void {
    // connecting the signalR for notification



    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // when discount deal add or update then it will be execute.


  }



}




