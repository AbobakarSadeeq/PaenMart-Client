import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, single, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { DynamicFormStructureService } from '../../product-extra-info/dynamic-form-structure/dynamic-form-structure.service';
import { ProductBrandService } from '../../product-extra-info/product-brand/product-brand.service';
import { AddProductService } from './add-product.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  getStyleFromNav: string = null;

  subscription: Subscription;

  // Structure of form properties only
  userMadeForm: any[] = [];
  selectFileslength = [];
  filterdCheckBoxData: any[] = [];
  customizeArrayCheckBox = [];
  checkBoxChecked = false;
  selectedFileData: any[] = [];

  // getting data for submitting form
  brands: any[] = [];

  // Submit form
  userDynamicForm: FormGroup;
  selectedFormName: string = "";
  selectedFormNestCategoryId = 0;



  constructor(private _adminService: AdminService,
    private _activateRoute: ActivatedRoute,
    private _dynamicFormStructureService: DynamicFormStructureService,
    private _productBrandService: ProductBrandService,
    private _addProductService: AddProductService,
    private fb: FormBuilder,
    private _route: Router,
    private _location: Location) {
  }

  ngOnInit(): void {
    // dynamically form added data
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    })


    let getSelectedFormId = +this._activateRoute.snapshot.queryParamMap.get("selectedDynamicFormStructureId");
    this.getDynamicFormStructureByNestCategoryId(getSelectedFormId);

    this.userDynamicForm = this.fb.group({

      commonInputsOfProducts: this.fb.group({
        productName: ['', [Validators.required]],
        price: ['', [Validators.required]],
        color: ['', [Validators.required]],
        stockAvailiability: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        productBrandId: [null, [Validators.required]],
      }),
    });


    this.selectedFormName = this._activateRoute.snapshot.params['NestCategoryName'];


    this._addProductService.getBrands(+this._activateRoute.snapshot.queryParamMap.get('NestCategoryId')).subscribe((data: any) => {
      this.brands = data;
    });

  }


  hideQuantityInputOfProduct = true;
  getDynamicFormStructureByNestCategoryId(selectFormId: number) {
    let countAddedFileInputs = 0;
    this.subscription = this._dynamicFormStructureService.get(selectFormId).subscribe((data: any) => {
      // if product size is true then dont add the quantity input
      if (data.productSize) {
        console.log(this.userDynamicForm);
        this.hideQuantityInputOfProduct = false;

      }




      // adding by default all checkbox value
      let convertDataToArr = JSON.parse(data.formStructure);
      let filteringDataForCheckBox = [];

      for (var singleInput of convertDataToArr) {
        if (singleInput.inputType == 'checkbox') {
          for (var singleCheckBoxData of singleInput.labelName) {
            let filterCheckBox = { checkBoxValuee: singleCheckBoxData.multipleOptionValue };
            filteringDataForCheckBox.push({ checkBoxValue: filterCheckBox.checkBoxValuee, check: false });
          }
          this.filterdCheckBoxData.push({ nameOfInput: singleInput.nameOfInput, lableName: filteringDataForCheckBox });
          filteringDataForCheckBox = [];
        }

        if (singleInput.inputType == 'file') {
          countAddedFileInputs = singleInput.numberOfChooseFileInputs;
        }

        this.userDynamicForm.addControl(singleInput.nameOfInput, this.fb.control("", [Validators.required]));
      }


      // productSize
      if (data.productSize == true) {
        this.productSizes = ["S", "M", "L", "XL"];
      }

      this.selectedFormNestCategoryId = data.nestSubCategoryId;
      this.userMadeForm = convertDataToArr;

      for (var i = 1; i <= countAddedFileInputs; i++) {
        this.selectFileslength.push(i);
      }

    });
  }


  checkBoxChanged(event: Event, labelNameOfCheckBoxes: string) {
    let selectCheckData = (event.target as HTMLInputElement).value;
    // findingValue that click on checked

    // first Time adding or checking Value
    let findingLabelName = this.filterdCheckBoxData.findIndex(a => a.nameOfInput == labelNameOfCheckBoxes);
    for (var singleCheckBox of this.filterdCheckBoxData[findingLabelName].lableName) {
      if (singleCheckBox.checkBoxValue == selectCheckData) {
        singleCheckBox.check = !singleCheckBox.check;

      }
    }
  }

  // file data change method
  fileChange(myEvent: any) {
    this.selectedFileData.push(<File>myEvent?.target?.files[0]);
  }


  customInputValidationError: string = null;
  CustomInputDataSubmit() {


    // means if size is found then hide input from dom and become false so, whenever storing product then store its all sizes quantity in main quantity input
    if (this.hideQuantityInputOfProduct == false) {
      for (var singleSizeQuantity of this.selectedProductSize) {
        this.totalSizeQuantities = this.totalSizeQuantities + (+singleSizeQuantity.sizeQuantity);
      }

      this.userDynamicForm.get('commonInputsOfProducts.quantity').setValue(this.totalSizeQuantities);
    }




    this.customInputValidationError = null;
    let completeDynamicFormData = this.userDynamicForm.value;

    // getting the file inputName and removing it from the form becuase dont want to send data null
    let findingIndexOfFile = this.userMadeForm.findIndex(a => a.inputType == "file");
    if (findingIndexOfFile != -1) {
      let gettingNameOfFile = this.userMadeForm[findingIndexOfFile].nameOfInput;
      this.userDynamicForm.removeControl(gettingNameOfFile);
      completeDynamicFormData = this.userDynamicForm.value;
    }



    // checkbox editing
    for (let singleProp in completeDynamicFormData) {
      if (completeDynamicFormData[singleProp] == "") {
        let currentIndexCheckBoxLabelName = singleProp;
        let findingIndexCheckBox = this.filterdCheckBoxData.findIndex(a => a.nameOfInput == currentIndexCheckBoxLabelName);
        if (findingIndexCheckBox == -1) {
          this.customInputValidationError = "you are missing adding inputs value";
          completeDynamicFormData = null;
          return;
        }
        completeDynamicFormData[singleProp] = this.filterdCheckBoxData[findingIndexCheckBox].lableName;
      }

    }

    // for images adding formData object
    const formFrom = new FormData();
    // adding data to the formData of images which is selected
    for (let i = 0; i < this.selectedFileData.length; i++) {
      formFrom.append(`File`, this.selectedFileData[i], this.selectedFileData[i]?.name);
    }
    debugger;
    let getCommonFormData = completeDynamicFormData.commonInputsOfProducts;
    let findingEmptyPropInObj = Object.fromEntries(Object.entries(getCommonFormData).filter(([_, v]) => v == ''));
    let findingEmptyValue = Object.keys(findingEmptyPropInObj).length > 0;

    if (findingEmptyValue) {
      this.customInputValidationError = "you are missing adding inputs value";
      completeDynamicFormData = null;
      return;
    }

    // removing single property from object
    delete completeDynamicFormData.commonInputsOfProducts;
    if (this.productSizes) {
      completeDynamicFormData = { ...completeDynamicFormData, productSize: this.selectedProductSize };
    }



    let convertConvertJsArrToJson = JSON.stringify(completeDynamicFormData);
    let convertJsonObjToJsonString = JSON.stringify(convertConvertJsArrToJson);
    formFrom.append("productName", getCommonFormData.productName);
    formFrom.append("price", getCommonFormData.price);
    formFrom.append("color", getCommonFormData.color);
    formFrom.append("stockAvailiability", getCommonFormData.stockAvailiability);
    formFrom.append("quantity", getCommonFormData.quantity);
    formFrom.append("productBrandId", getCommonFormData.productBrandId);
    formFrom.append("nestSubCategoryId", this.selectedFormNestCategoryId.toString());
    formFrom.append("productDetails", convertJsonObjToJsonString);
    this.subscription = this._addProductService.AddProduct(formFrom).subscribe(() => {

      this._location.back();
    })
    // unit test of dynamic form

    // ----- back-end functionality -----
    // reset does not required because navigating to another page
    // you have to make an class where it have two props one for form data another for its images and send that to server

  }


  // product size
  productSizes: string[] = null;
  selectedProductSize: any[] = [];
  totalSizeQuantities = 0;
  changeProductSize(event: Event) {
    let selectedCheckBox = (event.target as HTMLInputElement).value;
    let findingCheckBoxIndex = this.selectedProductSize.findIndex(a => a.sizeName == selectedCheckBox);
    if (findingCheckBoxIndex > -1) { // if value is founded
      this.selectedProductSize.splice(findingCheckBoxIndex, 1);
    } else {
      this.selectedProductSize.push({ sizeName: selectedCheckBox, sizeQuantity: 0 });
    }

  }

  sizeQuantityChange(event: any) {
    let findingChangeQuantityInputIndex = this.selectedProductSize.findIndex(a => a.sizeName == event.target.name);
    this.selectedProductSize[findingChangeQuantityInputIndex].sizeQuantity = event.target.value;
  }







  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}


