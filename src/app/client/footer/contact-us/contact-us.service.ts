import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private _http: HttpClient) { }

  sendContactUsMessage(data: any) {
    return this._http.post("https://localhost:44300/api/ExtraFeatures/ContactUsSendingEmail", data);
  }

}
