 import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
 import { Injectable } from "@angular/core";
 import { Observable } from "rxjs";
 import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

 @Injectable()
 export class AuthInterceptor implements HttpInterceptor {

     constructor(private router: Router) {

     }
     // we use this interceptor for that whenever request send to the server side then add every time authorization in the header and its token, if token is not present or make then send the user back to auth route
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         if (localStorage.getItem('token') != null) {
             const clonedReq = req.clone({
                 headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
             });
            return next.handle(clonedReq).pipe(
                 tap(
                     succ => { },
                     err => {
                         if (err.status == 401){
                             localStorage.removeItem('token');
                             this.router.navigateByUrl('/Auth');
                         }
                         else if(err.status == 403){
                          this.router.navigate(['/notfound']);
                         }
                     }
                 )
             )
         }
         else
             return next.handle(req.clone());
     }
 }
