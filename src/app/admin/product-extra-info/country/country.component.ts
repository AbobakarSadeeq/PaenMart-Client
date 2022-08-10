import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  subscription: Subscription;
  getStyleFromNav: string = null;
  countries: any[] = [];
  displayAddCountryModel = false;
  countryFormData: FormGroup;


  constructor(private _adminService: AdminService, private _categoryService: CategoryService,
    private _fb: FormBuilder, private DialogService: ConfirmationService, private _countryService: CountryService) { }


  ngOnInit(): void {

    this.countryFormData = this._fb.group({
      CountryName: ['', [Validators.required]]
    });


    this.getCountries();

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

  getCountry(Id: number) {
    this._countryService.get(Id).subscribe((data: any) => {

    });
  }

  onDeleteCountry(Id: number) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Country?',
      accept: () => {
        this._countryService.DeleteData(Id).subscribe((data: any) => {
          this.getCountries();
        });
      }
    });
  }

  onSaveCountry() {
    let obj = {
      countryName: this.countryFormData.value.CountryName
    }
    this._countryService.Insert(obj).subscribe((data: any) => {
      this.getCountries();
      this.displayAddCountryModel = false;
    });
  }

  showCountryModel() {
    this.displayAddCountryModel = true;
  }


  removeErrorMessage() {
    // this.categoryFormData.reset();
    this.countryFormData.reset();
  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
