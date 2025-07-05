import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<any> {
    return this.http.get(environment.countryApiUrl);
  }

  Insert(data: any) {
    return this.http.post(environment.countryApiUrl, data);
  }

  get(Id: any) {
    return this.http.get(environment.countryApiUrl + '/' + Id);
  }

  DeleteData(Id: any) {
    return this.http.delete(environment.countryApiUrl + '/' + Id);
  }




}
