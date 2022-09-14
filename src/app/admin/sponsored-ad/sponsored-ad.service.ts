import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SponsoredAdService {

  constructor(private _httpClient: HttpClient) { }

  addSponsoredAd(data: any) {
    return this._httpClient.post("https://localhost:44300/api/SponsoreAds", data);
  }

  getSponsoreLiveList() {
    return this._httpClient.get("https://localhost:44300/api/SponsoreAds/GetLiveAdsList");
  }

  deleteSponsore(adId: number) {
    return this._httpClient.delete("https://localhost:44300/api/SponsoreAds/" + adId);
  }

  getHistorySponsores() {
    return this._httpClient.get("https://localhost:44300/api/SponsoreAds/SponsoredAdsHistoryList");
  }

  getSponsoreDetail(selectedId: number) {
    return this._httpClient.get("https://localhost:44300/api/SponsoreAds/" + selectedId);
  }

  updateSponsoreAd(data:any){
    return this._httpClient.put("https://localhost:44300/api/SponsoreAds", data);

  }

}
