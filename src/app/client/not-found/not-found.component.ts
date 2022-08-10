import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],

})
export class NotFoundComponent implements OnInit {
  subscription:Subscription;
  showIndicator = false;
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {

    this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
      this.showIndicator = data;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
