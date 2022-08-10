import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedImagesService {

  constructor(private httpRequest:HttpClient) { }

  findinPhotoById(Id:any){
    return this.httpRequest.get("https://localhost:44300/api/UserPhoto" + "/" + Id);
  }

  GetListPhoto(userId:any){
  return  this.httpRequest.get("https://localhost:44300/api/UserPhoto" +"/GetSingleAllUserPhoto/" + userId);
  }

  UploadOrInsertPhoto(userId:string, data:any){
    return this.httpRequest.post("https://localhost:44300/api/UserPhoto"+ "/" + userId, data);
  }

  DeletePhoto(photoId:number){
    return this.httpRequest.delete("https://localhost:44300/api/UserPhoto"+ "/" + photoId);
  }

  // When we want to send the post and put requrest then we should send the data with Id so, here we dont need any kind of data to send becuasse put want to send data so, we send empty.
  isMainPhotoChanging(userId:string, photoId:number) {
    return this.httpRequest.put("https://localhost:44300/api/UserPhoto" + "/SetMainPhoto/" + userId + "/" + photoId,{});
  }
}
