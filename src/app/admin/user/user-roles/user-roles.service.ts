import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private httpRequest:HttpClient) { }


    //Creating Role
    creatingRole(data:any){
      return this.httpRequest.post("https://localhost:44300/api/Administrator",data)
    }

    //GetList of Roles to Admin
   getListRole(): Observable<any>{
      return this.httpRequest.get("https://localhost:44300/api/Administrator");
    }
    //GetById Role
    getDataById(id: any) {
      return this.httpRequest.get("https://localhost:44300/api/Administrator" + "/" + id);
    }
    //UpdatingRole which is find by Id
    updateRoleData(data: any) {
      return this.httpRequest.put("https://localhost:44300/api/Administrator/EditRole",data);
    }
    //DeletetingRole
    DeleteingRole(roleId:any): Observable<any>{
      return this.httpRequest.delete("https://localhost:44300/api/Administrator" + "/" + roleId);
    }


    //Getting the UserEmails which is in a role
    getEditUserRole(roleId:any): Observable<any>{
      return this.httpRequest.get("https://localhost:44300/api/Administrator/EditUserInRole" + "/" + roleId);
    }

    //adding Users in Role or removing From role
    editUserRole(data:any, roleId:any): Observable<any>{
      return this.httpRequest.post("https://localhost:44300/api/Administrator/updateRoleUser/"+ roleId, data);
    }
}
