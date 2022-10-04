import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loadingSpinnerService: LoadingSpinnerService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSpinnerService.loadingSpinner.next(true);
    return next.handle(req).pipe(
      delay(2500), finalize(() => {
        if (req.method == "POST" && req.url != "https://localhost:44300/api/Account/GetUserProfile") {
          setTimeout(() => {
            this.loadingSpinnerService.loadingSpinner.next(false);
          }, 2500);
        } else if(req.method == "PUT"){
          setTimeout(() => {
            this.loadingSpinnerService.loadingSpinner.next(false);
          }, 2500);
        } else if(req.method == "DELETE"){
          setTimeout(() => {
            this.loadingSpinnerService.loadingSpinner.next(false);
          }, 2500);
        }else {
          this.loadingSpinnerService.loadingSpinner.next(false);

        }
      })
    );


  }




}
