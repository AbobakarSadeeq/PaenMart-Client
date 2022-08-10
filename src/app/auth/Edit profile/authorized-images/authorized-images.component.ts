import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { AuthorizedImagesService } from './authorized-images.service';

@Component({
  selector: 'app-authorized-images',
  templateUrl: './authorized-images.component.html',
  styleUrls: ['./authorized-images.component.css']
})
export class AuthorizedImagesComponent implements OnInit {


  loadingIndicator = false;
  subscription: Subscription;
  displayModel: boolean = false;
  MainProfile: any;
  userPhotosData: any;
  imageForMainProfile: any = null;
  getSingleUserIdForPhotos: any;
  selectedTab: any = 0;
  userLoggedIn:any = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: Router,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private myActivateParams: ActivatedRoute,
    private authorizedImage: AuthorizedImagesService,
    private _authService: AuthService) {


  }

  ngOnInit(): void {

    // Getting Query String data for selecting Tab
    const selectingAddressTab = this.myActivateParams.snapshot.queryParamMap.get('selectAddressTab');
    this.selectedTab = selectingAddressTab;

    if(localStorage.getItem("token")){
      this.userLoggedIn = true;
    }else{
      this.userLoggedIn = false;
    }
    // this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
    //   this.loadingIndicator = data;
    // });

    // Getting SingleUser Data
    const getIdFromQueryString = this.myActivateParams.snapshot.params['id'];
    this.getSingleUserIdForPhotos = getIdFromQueryString
    this.GetAllPhotos(getIdFromQueryString);

    this._authService.profilePic.subscribe((data: any) => {
      this.imageForMainProfile = data;
    });

    this.imageForMainProfile = localStorage.getItem("photoUrl");


  }


  // Image Insertion
  selectedFile: any = null;
  fileChange(myEvent: any) {
    this.selectedFile = <File>myEvent?.target?.files[0];
  }

  @ViewChild('MyFileInput') MyFileInput: ElementRef;

  InsertPhoto(userId: string, photoData: NgForm) {
    this.hideModel();
    const formForm = new FormData();
    formForm.append("descriptionHeader", photoData.value.descriptionHeader);
    formForm.append("description", photoData.value.description);
    formForm.append("File", this.selectedFile, this.selectedFile?.name);

    this.authorizedImage.UploadOrInsertPhoto(userId, formForm).subscribe((data: any) => {
      if (data.isMainPhoto == true) {
        // LocalStorage is used becuase to override the
        localStorage.setItem("photoUrl", data.url);
        this._authService.profilePic.next(data.url);
      };
      this.loadingIndicator = false;

      this.GetAllPhotos(this.getSingleUserIdForPhotos);
      this.MyFileInput.nativeElement.value = null;
    });
  }



  hideModel() {
    this.displayModel = false;
  }



  GetAllPhotos(getUserId: any) {
    this.subscription = this.authorizedImage.GetListPhoto(getUserId).subscribe((data: any) => {
      this.userPhotosData = data;
    });
  }

  MainPhoto(photoData: any) {
    this.subscription = this.authorizedImage.isMainPhotoChanging(photoData?.customIdentityId, photoData?.id).subscribe(() => {
      this.GetAllPhotos(photoData?.customIdentityId);
      localStorage.setItem("photoUrl", photoData.url)
      this._authService.profilePic.next(photoData.url);
    });
  }

  openDeleteDailog(photoData: any, userId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete Your Profile Picture?',
      accept: () => {
        this.loadingIndicator = true;
        this.authorizedImage.DeletePhoto(photoData).subscribe(() => {
          this.GetAllPhotos(userId);
          this.loadingIndicator = false;
        });
      }
    });
  }



  // Close Dialog
  closeDialog() {
    this.confirmationService.close();
  }


  AddUserImageModel() {
    this.displayModel = true;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
