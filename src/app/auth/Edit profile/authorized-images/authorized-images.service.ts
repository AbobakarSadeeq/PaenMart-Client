import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedImagesService {

  constructor(private httpRequest: HttpClient) { }

  findinPhotoById(Id: any) {
    return this.httpRequest.get(environment.userPhotoApiUrl + "/" + Id);
  }

  GetListPhoto(userId: any) {
    return this.httpRequest.get(environment.userPhotoApiUrl + "/GetSingleAllUserPhoto/" + userId);
  }

  UploadOrInsertPhoto(userId: string, data: any) {
    return this.httpRequest.post(environment.userPhotoApiUrl + "/" + userId, data);
  }

  DeletePhoto(photoId: number) {
    return this.httpRequest.delete(environment.userPhotoApiUrl + "/" + photoId);
  }

  // Set main photo
  isMainPhotoChanging(userId: string, photoId: number) {
    return this.httpRequest.put(environment.userPhotoApiUrl + "/SetMainPhoto/" + userId + "/" + photoId, {});
  }

}
