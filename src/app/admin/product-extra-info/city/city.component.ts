import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { CountryService } from '../country/country.service';
import { CityService } from './city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  subscription: Subscription;
  getStyleFromNav: string = null;
  countries: any[] = [];
  cities: any[] = [];
  displayAddcityModel = false;
  cityFormData: FormGroup;


  constructor(private _adminService: AdminService, private _categoryService: CategoryService,
    private _fb: FormBuilder, private DialogService: ConfirmationService, private _cityService: CityService,
    private _countryService: CountryService) { }


  ngOnInit(): void {

    this.cityFormData = this._fb.group({
      cityName: ['', [Validators.required]],
      countryId: ['', [Validators.required]]
    });


    this.getCities();
    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });
  }


  getCountries() {
    this.subscription = this._countryService.GetAll().subscribe((data: any) => {
      this.countries = data;
    })
  }

  getCities() {
    this.subscription = this._cityService.GetAll().subscribe((data: any) => {
      this.cities = data;
    })
  }

  getCity(Id: number) {
    this._cityService.get(Id).subscribe((data: any) => {

    });
  }

  onDeleteCity(Id: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete city?',
      accept: () => {
        this._cityService.DeleteData(Id).subscribe((data: any) => {
          this.getCities();
        });
      }
    });
  }

  onSaveCity() {
    let obj = {
      cityName: this.cityFormData.value.cityName,
      countryId: this.cityFormData.value.countryId
    }
    this._cityService.Insert(obj).subscribe((data: any) => {
      this.getCities();
      this.displayAddcityModel = false;
    });
  }

  showcityModel() {
    this.displayAddcityModel = true;
    this.getCountries();

  }


  removeErrorMessage() {
    // this.categoryFormData.reset();
    this.cityFormData.reset();
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
