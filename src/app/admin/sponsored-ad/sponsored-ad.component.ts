import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SponsoredAdService } from './sponsored-ad.service';

@Component({
  selector: 'app-sponsored-ad',
  templateUrl: './sponsored-ad.component.html',
  styleUrls: ['./sponsored-ad.component.css']
})
export class SponsoredAdComponent implements OnInit {
  subscription: Subscription;
  sponsoresAdList: any[] = [];
  sponsoresHistoryAdList: any[] = [];


  displayAddAdSponsoreModel: boolean;
  sponsoredAdForm: FormGroup;
  showAdOnPageList: any[] = [];


  constructor(private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _sponsoredAdService: SponsoredAdService,
    private _fb: FormBuilder,
    private _confirmService: ConfirmationService) { }

  ngOnInit(): void {

    this.showAdOnPageList = [
      { pageName: 'HomePage', inUsed: false },
      { pageName: 'MixProductsPage', inUsed: false },
      { pageName: 'ProductDetailPage', inUsed: false },
      { pageName: 'HomePopUpPage', inUsed: false },
      { pageName: 'SearchProductPage', inUsed: false },
    ];

    this.sponsoredAdForm = this._fb.group({
      sponsoredByName: ['', [Validators.required]],
      adUrlDestination: ['', [Validators.required]],
      adPrice: ['', [Validators.required]],
      showAdOn: ['', [Validators.required]],
      expire_At: ['', [Validators.required]]
    });


    this.getLiveAdsSponsers();

  }

  getLiveAdsSponsers() {
    this.subscription = this._sponsoredAdService.getSponsoreLiveList().subscribe((data: any) => {
      for (var singleSponsor of data) {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var currentDate = dd + '/' + mm + '/' + yyyy;
        var expire_At_Date = new Date(singleSponsor.expire_At);
        if (currentDate == expire_At_Date.getDate() + "/" + String(today.getMonth() + 1).padStart(2, '0') + "/" + expire_At_Date.getFullYear()) {
          this._sponsoredAdService.deleteSponsore(singleSponsor?.adID).subscribe((data: any) => {
          })
        }


        let findingIndex = this.showAdOnPageList.findIndex(a => a.pageName == singleSponsor.showAdOnPage);
        if (findingIndex != -1 && singleSponsor.adStatus == "Live") {
          this.showAdOnPageList[findingIndex].inUsed = true;
        }

      }
      this.sponsoresAdList = data;
    })
  }

  showAddAdSponsoreModel() {
    this.displayAddAdSponsoreModel = true;
  }

  selectedFile: any = null;
  fileChange(myEvent: any) {
    this.selectedFile = <File>myEvent?.target?.files[0];
  }

  onSaveSponsoreAd() {
    const formData = new FormData();
    formData.append("sponsoredByName", this.sponsoredAdForm.value['sponsoredByName']);
    formData.append("adUrlDestination", this.sponsoredAdForm.value['adUrlDestination']);
    formData.append("adPrice", this.sponsoredAdForm.value['adPrice']);
    formData.append("showAdOn", this.sponsoredAdForm.value['showAdOn']);
    formData.append("expire_At", this.sponsoredAdForm.value['expire_At']);
    formData.append("File", this.selectedFile, this.selectedFile?.name);

    this._sponsoredAdService.addSponsoredAd(formData).subscribe((response: any) => {
      this.getLiveAdsSponsers();
    });

    this.displayAddAdSponsoreModel = false;
    this.sponsoredAdForm.reset();
    this.selectedFile = null;
  }

  getAdSponsoreUpdate(selectedAdId: number) {

  }

  onDeleteSponsoreAd(selectedAdId: number) {
    this._confirmService.confirm({
      message: 'Are you sure you want to Delete or expire the live sponsore?',
      accept: () => {
        this._sponsoredAdService.deleteSponsore(selectedAdId).subscribe((data: any) => {
          this.getLiveAdsSponsers();
        })
      }
    });
  }

  onTabChanged(event: any) {
    if (event.index == 1) {
      this.subscription = this._sponsoredAdService.getHistorySponsores().subscribe((data: any) => {
        this.sponsoresHistoryAdList = data;
      })
    }
  }

  removeErrorMessage() {
    this.displayAddAdSponsoreModel = false;
    this.sponsoredAdForm.reset();
    this.selectedFile = null;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
