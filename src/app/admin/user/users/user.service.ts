import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  GetAllEmployees(): Observable<any> {
    return this.http.get(environment.usersApiUrl + "/GetAllEmployees");
  }

  GetAllShipper(): Observable<any> {
    return this.http.get(environment.usersApiUrl + "/GetAllShipper");
  }

  GetAllUsers(roleId: string): Observable<any> {
    return this.http.get(environment.usersApiUrl + "/GetAllUsers/" + roleId);
  }

  DeleteData(Id: string) {
    return this.http.delete(environment.usersApiUrl + "/" + Id);
  }

  GetUser(Id: string) {
    return this.http.get(environment.usersApiUrl + "/" + Id);
  }

  UpdateUserData(data: any) {
    return this.http.put(environment.usersApiUrl, data);
  }

  getListRole(): Observable<any> {
    return this.http.get(environment.administratorApiUrl);
  }

  Insert(data: any) {
    return this.http.post(environment.usersApiUrl, data);
  }


  // get(Id: any) {
  //   return this.http.get(this.myUrl + '/' + Id);
  // }


}
