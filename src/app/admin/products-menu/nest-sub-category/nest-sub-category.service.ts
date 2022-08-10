import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NestSubCategoryService extends CrudService {

  constructor(http:HttpClient, private forCustomApisHttp:HttpClient ) {
    super(environment.urlNestSubCategory, http);
   }


}
