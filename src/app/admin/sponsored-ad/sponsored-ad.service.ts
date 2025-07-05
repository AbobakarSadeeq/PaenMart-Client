import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SponsoredAdService {

  constructor(private _httpClient: HttpClient) { }

  addSponsoredAd(data: any) {
    return this._httpClient.post(environment.sponsoreAdsApiUrl, data);
  }

  getSponsoreLiveList() {
    return this._httpClient.get(environment.sponsoreAdsApiUrl + "/GetLiveAdsList");
  }

  deleteSponsore(adId: number) {
    return this._httpClient.delete(environment.sponsoreAdsApiUrl + "/" + adId);
  }

  getHistorySponsores() {
    return this._httpClient.get(environment.sponsoreAdsApiUrl + "/SponsoredAdsHistoryList");
  }

  getSponsoreDetail(selectedId: number) {
    return this._httpClient.get(environment.sponsoreAdsApiUrl + "/" + selectedId);
  }

  updateSponsoreAd(data: any) {
    return this._httpClient.put(environment.sponsoreAdsApiUrl, data);
  }

  getAdByPageName(pageName: string) {
    return this._httpClient.get(environment.sponsoreAdsApiUrl + "/SearchingAdsForPageAvailable/" + pageName);
  }


}
