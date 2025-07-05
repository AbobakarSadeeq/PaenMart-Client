import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  // Angular Form and Subscription
  reactiveFormData: FormGroup;
  subscription: Subscription;

  // Validation Property
  pleaseAddAddress = false;
  forSelected = null;


  // Data Property
  getUserId = null;
  getSingleUserAddress: any;
  loadingIndicator = false;


  // Arrays of Data
  Cities: any[] = [];
  Countries: any[] = [];
  CitiesDataFilterd: any[] = [];

  // Models Properties
  displayModel = false;
  editDisplayModelUserAddress = false;
  displayModelUserAddress = false;

  constructor(private cdr: ChangeDetectorRef,
    private myActivateParams: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router,
    private _authService: AuthService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.route.navigate(['/Auth']);
    }
    // Loading Spinner
    // this.subscription =  this._authService.loadingSpinnerLogOut.subscribe((data:any)=>{
    //   this.loadingIndicator = data;
    // });

    // Getting the User-Id from required parameter
    const getIdFromQueryString = this.myActivateParams.snapshot.params['id'];
    this.getUserId = getIdFromQueryString;


    // Getting the Address if it is found, if not then show, not found message.
    this.subscription = this._authService.getUserAddress(getIdFromQueryString).subscribe((data: any) => {
      if (data == true) {
        this.pleaseAddAddress = data;
      } else {
        this.getSingleUserAddress = data;
      }
    });

    // Adding User Address Form Data
    this.reactiveFormData = this.fb.group({
      completeAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      user_ID: ['', Validators.required],
      countries: ['', Validators.required],
      city_ID: ['', [Validators.required, Validators.min(1)]]
    });


    // Get Countries and Cities from Database
    this.GetAllCities();
    this.GetAllCountries();


    // First I have to Subscribe this before applying event for selecting Tab and it is used for to select edit user Address tab



  }


  // Add Address Model
  AddUserAddressModel() {
    this.displayModelUserAddress = true;
  }

  // User Address:
  InsertUserAddress(formData: NgForm) {
    console.log(formData.value);
    //  this.loadingIndicator = true;
    this.subscription = this._authService.insertUserAddress(formData.value).subscribe(() => {
      this.hideModel();
      this.loadingIndicator = false;
      this.route.navigate(['']);
    });
  }



  // Get the Old data from database and show and open model
  EditUserAddressModel(editData: any) {
    console.log(editData);
    this.editDisplayModelUserAddress = true;
    this.reactiveFormData = this.fb.group({
      completeAddress: [editData.completeAddress],
      phoneNumber: [editData.phoneNumber],
      user_ID: [editData.userId],
      countries: [editData.city?.countryId],
      city_ID: [editData.cityId]
    })

  }


  // SubMit Edit User Address
  EditUserAddress() {
    const formFrom = new FormData();
    formFrom.append("completeAddress", this.reactiveFormData.value['completeAddress']);
    formFrom.append("phoneNumber", this.reactiveFormData.value['phoneNumber']);
    formFrom.append("userId", this.reactiveFormData.value['user_ID']);
    formFrom.append("cityId", this.reactiveFormData.value['city_ID']);


    //  this.loadingIndicator = true;
    this.subscription = this._authService.updateUserAddress(formFrom).subscribe(() => {
      this.editDisplayModelUserAddress = false;
      this.loadingIndicator = false;
      this.route.navigate(['']);
    })
  }



  GetAllCities() {
    this.subscription = this._authService.getCities().subscribe((data: any) => {
      this.CitiesDataFilterd = data;
      this.Cities = data;
    })
  }

  GetAllCountries() {
    this.subscription = this._authService.getCountry().subscribe((data: any) => {
      this.Countries = data;
    })
  }


  showingCities(event: Event) {
    var Id = (event.target as HTMLInputElement).value;
    this.CitiesDataFilterd = this.Cities.filter(a => a.countryId == Id);
    this.cdr.detectChanges();
  }

  EditHideModel() {
    this.CitiesDataFilterd = this.Cities;
  }


  hideModel() {
    this.displayModel = false;
  }




  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
