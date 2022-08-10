import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  GetAll(): Observable<any> {
    return this.http.get("https://localhost:44300/api/Country");
  }
  Insert(data: any) {
    return this.http.post("https://localhost:44300/api/Country", data);
  }
  get(Id: any) {
    return this.http.get("https://localhost:44300/api/Country" + '/' + Id);
  }
  DeleteData(Id: any) {
    return this.http.delete("https://localhost:44300/api/Country" + '/' + Id);
  }



}
