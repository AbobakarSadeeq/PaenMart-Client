import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  getAllCarouselImages(): Observable<any> {
    return this.http.get(environment.carouselApiUrl)
  }

  DeleteCarouselImage(Id: number) {
    return this.http.delete(environment.carouselApiUrl + "/" + Id);
  }

  updateCarousel(data: any) {
    return this.http.put(environment.carouselApiUrl, data);
  }

  AddCarousel(data: any) {
    return this.http.post(environment.carouselApiUrl, data);
  }

  getSingleCarouselImage(dataId: number) {
    return this.http.get(environment.carouselApiUrl + "/" + dataId)
  }




}
