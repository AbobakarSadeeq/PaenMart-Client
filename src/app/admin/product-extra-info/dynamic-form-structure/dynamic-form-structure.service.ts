import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormStructureService extends CrudService {

  constructor(http:HttpClient) {
    super(environment.urlDynamicFormStructure, http);
   }
}
