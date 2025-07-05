import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<any> {
    return this.http.get(environment.cityApiUrl);
  }

  Insert(data: any) {
    return this.http.post(environment.cityApiUrl, data);
  }

  get(Id: any) {
    return this.http.get(environment.cityApiUrl + '/' + Id);
  }

  DeleteData(Id: any) {
    return this.http.delete(environment.cityApiUrl + '/' + Id);
  }


}
