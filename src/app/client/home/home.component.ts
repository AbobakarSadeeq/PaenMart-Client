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

  slides = [
    { img: '../../../assets/Brands logo/oneplus-logo.png' },
    { img: '../../../assets/Brands logo/Emblem-Bang-Olufsen.jpg' },
    { img: '../../../assets/Brands logo/google-logo-web.png' },
    { img: '../../../assets/Brands logo/microsoft-logo-vector-microsoft-logo-isolated-background-your-design-vector-illustration-eps-microsoft-logo-vector-230453275.jpg' },
    { img: '../../../assets/Brands logo/apple-logo.jpg' },
    { img: '../../../assets/Brands logo/samsung1.jpg' },
    { img: '../../../assets/Brands logo/sony.jpg' },
    { img: '../../../assets/Brands logo/Xiaomi-Logo-Vector-01-removebg-preview (1).png' },


  ];
  slideConfig = { slidesToShow: 5, slidesToScroll: 5 };

  popularCategorySlides = [
    { img: '../../../assets/popular categories/1.PNG' },
    { img: '../../../assets/popular categories/2.PNG' },
    { img: '../../../assets/popular categories/4.PNG' },
    { img: '../../../assets/popular categories/3.PNG' },
    { img: '../../../assets/popular categories/5.PNG' },


  ]

  popularCategorySlidesConfig = { slidesToShow: 4, slidesToScroll: 4 };


  subscription: Subscription;
  fiveMostSelledProduct: any[] = [];
  carouselImgList: any[] = [];
  popUpAd: any;
  sideHomeAd: any;
  fiveDiscountProducts: any[] = [];
  fiveProductsReview: any[] = [];
  recentlyViewProducts: any[] = [];

  constructor(private _HomeService: HomeService,
    private _sponsoredAdService: SponsoredAdService) { }

  ngOnInit(): void {

    // get 5 Recently viewed product
    if (localStorage.getItem("RecentlyViewedProduct")) {
      this.recentlyViewProducts = JSON.parse(localStorage.getItem("RecentlyViewedProduct"));
    }

    // get 5 discount products
    this.subscription = this._HomeService.GetFiveDiscountProducst().subscribe((data: any) => {
      if (data) {
        this.fiveDiscountProducts = data;
      }
    });

    this.subscription = this._HomeService.GetMostFiveProductSelled().subscribe((data: any) => {
      if (data) {
        this.fiveMostSelledProduct = data;
      }
    });


    this.subscription = this._HomeService.GetFiveProductReview().subscribe((data: any) => {
      if (data) {
        this.fiveProductsReview = data;
      }
    })



    // get carousel
    this.subscription = this._HomeService.GetCarouselImages().subscribe((data: any) => {
      if (data) {
        this.carouselImgList = data;
      }
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





