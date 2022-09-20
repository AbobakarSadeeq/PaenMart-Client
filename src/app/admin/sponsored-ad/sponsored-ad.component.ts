import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
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
  getStyleFromNav: string = null;

  constructor(private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _sponsoredAdService: SponsoredAdService,
    private _fb: FormBuilder,
    private _confirmService: ConfirmationService,
    private _adminService: AdminService) { }

  ngOnInit(): void {

    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

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
      showAdOn: [null, [Validators.required]],
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
  imgSrc = null;
  fileChange(myEvent: any) {
    this.selectedFile = <File>myEvent?.target?.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;

    reader.readAsDataURL(<File>myEvent?.target?.files[0]);
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

  updateModel = false;
  getAdSponsoreUpdate(selectedAdId: number) {
    this.updateModel = true;
    this.subscription = this._sponsoredAdService.getSponsoreDetail(selectedAdId).subscribe((data: any) => {
      let customizingDate = new Date(data?.expire_At);
      this.sponsoreDetailModel = data;

      this.sponsoredAdForm = this._fb.group({
        sponsoredByName: [data?.sponsoredByName, [Validators.required]],
        adUrlDestination: [data?.adUrlDestination, [Validators.required]],
        adPrice: [data?.adPrice, [Validators.required]],
        showAdOn: [data?.showAdOnPage, [Validators.required]],
        expire_At: [customizingDate.getFullYear() + "-" + String(customizingDate.getMonth() + 1).padStart(2, '0') + "-" + String(customizingDate.getDate()).padStart(2, '0'), [Validators.required]],
      });
    })
  }

  onSaveUpdateGetAdSponsoreUpdate() {
    this.updateModel = false;
    const formData = new FormData();
    formData.append("sponsoredByName", this.sponsoredAdForm.value['sponsoredByName']);
    formData.append("adUrlDestination", this.sponsoredAdForm.value['adUrlDestination']);
    formData.append("adPrice", this.sponsoredAdForm.value['adPrice']);
    formData.append("showAdOn", this.sponsoredAdForm.value['showAdOn']);
    formData.append("expire_At", this.sponsoredAdForm.value['expire_At']);
    formData.append("adID", this.sponsoreDetailModel['adID']);
    let changePage = this.sponsoredAdForm.value['showAdOn'];
    if (this.selectedFile) {
      formData.append("File", this.selectedFile, this.selectedFile?.name);
    }

    this._sponsoredAdService.updateSponsoreAd(formData).subscribe((response: any) => {
      this.getLiveAdsSponsers();

      this.showAdOnPageList[this.showAdOnPageList.findIndex(a => a.pageName == this.sponsoreDetailModel['showAdOnPage'])].inUsed = false;
      this.showAdOnPageList[this.showAdOnPageList.findIndex(a => a.pageName == changePage)].inUsed = true;

    });

    this.selectedFile = null;
    this.sponsoredAdForm.reset();

  }

  detailModel = false;
  sponsoreDetailModel = null;
  getSingleSponsoreDetailModel(selectedAdIdSponsore: number) {
    this.detailModel = true;

    this.subscription = this._sponsoredAdService.getSponsoreDetail(selectedAdIdSponsore).subscribe((data: any) => {
      this.sponsoreDetailModel = data;
    })
  }

  onDeleteSponsoreAd(selectedAdId: number, selectedPageName: string) {
    this._confirmService.confirm({
      message: 'Are you sure you want to Delete or expire the live sponsore?',
      accept: () => {
        this._sponsoredAdService.deleteSponsore(selectedAdId).subscribe((data: any) => {
          this.getLiveAdsSponsers();
          this.showAdOnPageList[this.showAdOnPageList.findIndex(a => a.pageName == selectedPageName)].inUsed = false;
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
    this.detailModel = false;
    this.updateModel = false;
    this.imgSrc = null;

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
