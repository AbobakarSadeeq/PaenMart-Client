import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {





  constructor(@Inject(String) private myUrl: string, private http: HttpClient) { }


  GetAll(): Observable<any> {
    return this.http.get(this.myUrl);
  }
  Insert(data: any) {
    return this.http.post(this.myUrl, data);
  }
  get(Id: any) {
    return this.http.get(this.myUrl + '/' + Id);
  }
  DeleteData(Id: any) {
    return this.http.delete(this.myUrl + '/' + Id);
  }
  UpdateData(data: any) {
    return this.http.put(this.myUrl, data);
  }


}
