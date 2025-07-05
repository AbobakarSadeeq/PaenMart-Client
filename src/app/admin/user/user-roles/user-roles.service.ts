import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private httpRequest: HttpClient) { }

  // Creating Role
  creatingRole(data: any) {
    return this.httpRequest.post(environment.administratorApiUrl, data);
  }

  // Get List of Roles to Admin
  getListRole(): Observable<any> {
    return this.httpRequest.get(environment.administratorApiUrl);
  }

  // Get By Id Role
  getDataById(id: any) {
    return this.httpRequest.get(environment.administratorApiUrl + "/" + id);
  }

  // Updating Role which is found by Id
  updateRoleData(data: any) {
    return this.httpRequest.put(environment.administratorApiUrl + "/EditRole", data);
  }

  // Deleting Role
  DeleteingRole(roleId: any): Observable<any> {
    return this.httpRequest.delete(environment.administratorApiUrl + "/" + roleId);
  }

  // Getting the UserEmails which are in a role
  getEditUserRole(roleId: any): Observable<any> {
    return this.httpRequest.get(environment.administratorApiUrl + "/EditUserInRole/" + roleId);
  }

  // Adding Users in Role or Removing From Role
  editUserRole(data: any, roleId: any): Observable<any> {
    return this.httpRequest.post(environment.administratorApiUrl + "/updateRoleUser/" + roleId, data);
  }

}
