import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private _http: HttpClient) { }

  sendContactUsMessage(data: any) {
    return this._http.post(environment.extraFeaturesApiUrl + "/ContactUsSendingEmail", data);
  }

}
