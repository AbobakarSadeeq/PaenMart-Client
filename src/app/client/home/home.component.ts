import { digest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription:Subscription;
  fiveMostSelledProduct:any [] = [];
  carouselImgList:any[] = [];

  constructor(private _HomeService:HomeService) { }

  ngOnInit(): void {



    this.subscription = this._HomeService.GetMostFiveProductSelled().subscribe((data:any)=>{
      this.fiveMostSelledProduct = data;
    });

    // get carousel
    this.subscription = this._HomeService.GetCarouselImages().subscribe((data:any)=>{
      this.carouselImgList = data;
    })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}





