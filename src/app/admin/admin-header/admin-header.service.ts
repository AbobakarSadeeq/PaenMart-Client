import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminHeaderService {

  constructor() { }

  productFormAdded = new Subject<any>();

}
