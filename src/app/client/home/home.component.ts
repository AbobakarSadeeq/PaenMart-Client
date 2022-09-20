import { digest } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SponsoredAdService } from 'src/app/admin/sponsored-ad/sponsored-ad.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription: Subscription;
  fiveMostSelledProduct: any[] = [];
  carouselImgList: any[] = [];
  popUpAd: any;
  sideHomeAd: any;

  constructor(private _HomeService: HomeService,
    private _sponsoredAdService: SponsoredAdService) { }

  ngOnInit(): void {



    this.subscription = this._HomeService.GetMostFiveProductSelled().subscribe((data: any) => {
      this.fiveMostSelledProduct = data;
    });

    // get carousel
    this.subscription = this._HomeService.GetCarouselImages().subscribe((data: any) => {
      this.carouselImgList = data;
    });

    // sponsore ad getting
    this.subscription = this._sponsoredAdService.getAdByPageName("Home").subscribe((data: any) => {
      // for (var singleHomeSponsoreAd of data) {
      //   if (singleHomeSponsoreAd.liveOnPageName == "HomePopUpPage") {
      //     this.popUpAd = singleHomeSponsoreAd;
      //   } else {
      //     this.sideHomeAd = singleHomeSponsoreAd;
      //   }
      // }
    })



  }

  displaySponsoreAdModal = true;
  hideAdDialog() {
    this.displaySponsoreAdModal = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}





