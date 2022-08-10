import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http:HttpClient) { }

  getAllCarouselImages(): Observable<any>{
    return this.http.get("https://localhost:44300/api/Carousel")
  }

  DeleteCarouselImage(Id:number){
    return this.http.delete("https://localhost:44300/api/Carousel/" + Id);
  }

  updateCarousel(data:any){
    return this.http.put("https://localhost:44300/api/Carousel",data);
  }

  AddCarousel(data:any){
    return this.http.post("https://localhost:44300/api/Carousel",data);
  }

  getSingleCarouselImage(dataId:number){
    return this.http.get("https://localhost:44300/api/Carousel/" + dataId)
  }




}
