import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router:Router ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem('token')!= null ){
        let roles = route.data['permittedRoles'] as Array<string>;
        if(roles){
          const match = this._authService.roleMatch(roles);
        if(match){
          return true
        }
         else{
          this._router.navigate(['/notfound']);
          return false;
         }
        }
        return true;
      }else{
        this._router.navigate(['/Auth']);
        return false;
      }

  }

}
