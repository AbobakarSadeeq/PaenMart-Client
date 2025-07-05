import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtraFeaturesService {

  constructor(private _http: HttpClient) { }

  getSendingEmailData() {
    return this._http.get(environment.extraFeaturesApiUrl);
  }

  AddSendingEmailData(data: any) {
    return this._http.post(environment.extraFeaturesApiUrl, data);
  }

  updateSendingEmailData(data: any) {
    return this._http.put(environment.extraFeaturesApiUrl, data);
  }
}
