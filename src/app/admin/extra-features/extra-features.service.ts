import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtraFeaturesService {

  constructor(private _http: HttpClient) { }

  getSendingEmailData() {
    return this._http.get("https://localhost:44300/api/ExtraFeatures");
  }

  AddSendingEmailData(data: any) {
    return this._http.post("https://localhost:44300/api/ExtraFeatures", data);
  }

  updateSendingEmailData(data: any) {
    return this._http.put("https://localhost:44300/api/ExtraFeatures", data);
  }
}
