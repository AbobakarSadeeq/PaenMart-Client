import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetAllEmployees(): Observable<any> {
    return this.http.get("https://localhost:44300/api/Users/GetAllEmployees");
  }

  GetAllShipper(): Observable<any> {
    return this.http.get("https://localhost:44300/api/Users/GetAllShipper");
  }

  GetAllUsers(roleId: string): Observable<any> {
    return this.http.get("https://localhost:44300/api/Users/GetAllUsers/" + roleId);
  }

  DeleteData(Id: string) {
    return this.http.delete("https://localhost:44300/api/Users" + '/' + Id);
  }

  GetUser(Id: string) {
    return this.http.get("https://localhost:44300/api/Users" + '/' + Id);

  }

  UpdateUserData(data: any) {
    return this.http.put("https://localhost:44300/api/Users", data);
  }


  getListRole(): Observable<any> {
    return this.http.get("https://localhost:44300/api/Administrator");
  }

  Insert(data: any) {
    return this.http.post("https://localhost:44300/api/Users", data);
  }

  // get(Id: any) {
  //   return this.http.get(this.myUrl + '/' + Id);
  // }


}
