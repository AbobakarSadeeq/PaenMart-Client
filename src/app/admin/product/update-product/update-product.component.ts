import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { single, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { DynamicFormStructureService } from '../../product-extra-info/dynamic-form-structure/dynamic-form-structure.service';
import { ProductBrandService } from '../../product-extra-info/product-brand/product-brand.service';
import { ProductService } from '../product.service';
import { UpdateProductService } from './update-product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {




  getStyleFromNav: string = null;
  subscription: Subscription;

  // Query string
  getSelectedProductName = "";
  getSelectedDynamicFormId = 0;
  getSelectedNestCategoryId = 0;


  userDynamicForm: FormGroup;
  brands: any[] = [];
  userMadeForm: any[] = [];
  addingCheckBoxCheckProp: any[] = [];



  // Submit form
  selectedFormName: string = "";
  selectedFormNestCategoryId = 0;
  validationMesg = null;



  constructor(private _adminService: AdminService,
    private _productService: ProductService,
    private _route: Router,
    private _activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private DialogService: ConfirmationService,
    private _productBrandService: ProductBrandService,
    private _dynamicFormStructureService: DynamicFormStructureService,
    private _updateProductService: UpdateProductService,
    private _location: Location
  ) { }


  ngOnInit(): void {

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    })

    this.getSelectedProductName = this._activateRoute.snapshot.params['NestCategoryName'];
    this.getSelectedDynamicFormId = +this._activateRoute.snapshot.queryParamMap.get("selectedDynamicFormStructureId");
    this.getSelectedNestCategoryId = +this._activateRoute.snapshot.queryParamMap.get("NestCategoryId");



    this.userDynamicForm = this.fb.group({

      commonInputsOfProducts: this.fb.group({
        productName: ['', [Validators.required]],
        price: ['', [Validators.required]],
        color: ['', [Validators.required]],
        stockAvailiability: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        productBrandId: [null, [Validators.required]],
      })
    });

    this._updateProductService.getBrands(+this._activateRoute.snapshot.queryParamMap.get("nestCategoryId")).subscribe((data: any) => {
      console.log(data);
      this.brands = data;
    });
    this.getSelectedProductData(+this._activateRoute.snapshot.queryParamMap.get("productId"));


    setTimeout(() => {
      this.getDynamicFormStructureByNestCategoryId(+this._activateRoute.snapshot.queryParamMap.get("selectedDynamicFormStructureId"));
    }, 2000)


  }

  // get form structure
  subCheckBoxArr: any[] = [];
  getDynamicFormStructureByNestCategoryId(selectFormId: number) {
    let countAddedFileInputs = 0;
    this.subscription = this._dynamicFormStructureService.get(selectFormId).subscribe((data: any) => {
      // productSize
      setTimeout(()=>{
        if (data.productSize == false) {
          this.productSizeValid = false;
        }
      },1000)




      let convertJsonToJsObj = JSON.parse(data.formStructure);
      this.selectedFormNestCategoryId = data.nestSubCategoryId;
      // Adding checkbox by default a false value
      for (var singleInput of convertJsonToJsObj) {


        // if checkbox is multiple checkboxes

        if (singleInput.inputType == 'checkbox') {
          let reDesigningCheckBoxKey = singleInput.nameOfInput;

          if (this.getDynamicFormData[reDesigningCheckBoxKey]) {
            singleInput.labelName = this.getDynamicFormData[reDesigningCheckBoxKey];
          }
          this.fatchedCheckBoxData.push({ [singleInput.nameOfInput]: singleInput.labelName });
        }

      // productSize

        // if(singleInput.inputType == 'checkbox'){
        // let checkBoxArrValue = null;
        //   checkBoxArrValue = singleInput.labelName;
        //   for (var singleCheckBoxValue of checkBoxArrValue) {
        //     this.addingCheckBoxCheckProp.push({ checkBoxValue: singleCheckBoxValue.multipleOptionValue, check: false});

        // }

        // this.subCheckBoxArr.push({ labelName:singleInput.nameOfInput, checkBoxArr:this.addingCheckBoxCheckProp});
        // this.addingCheckBoxCheckProp = [];

        // }


      }


      for (var singleInput of convertJsonToJsObj) {
        if (singleInput.inputType == 'file') {
          countAddedFileInputs = singleInput.numberOfChooseFileInputs;
        }
        this.userDynamicForm.addControl(singleInput.nameOfInput, this.fb.control("", [Validators.required]));
      }



      // File logic

      if (countAddedFileInputs > this.productImagesGetting.length) {
        let getDifferenceBetweenLoop = countAddedFileInputs - this.productImagesGetting.length;
        // if file length is less then adding file length then add null to the url there
        for (var i = 1; i <= getDifferenceBetweenLoop; i++) {
          this.selectFileslength.push(1); // 1 means file canbe added
        }
      }

      this.userMadeForm = convertJsonToJsObj;

    });



  }
  getDynamicFormData: any;





  getSelectedProductData(selectedId: number) {
    this.subscription = this._productService.GetSingleProductById(selectedId).subscribe((dataResponse: any) => {
      // file
      this.productImagesGetting = dataResponse.getProductImagess;
      console.log(dataResponse);


      this.userDynamicForm = this.fb.group({
        commonInputsOfProducts: this.fb.group({
          productName: [dataResponse.productName, [Validators.required]],
          price: [dataResponse.price, [Validators.required]],
          color: [dataResponse.color, [Validators.required]],
          stockAvailiability: [dataResponse.stockAvailiability.toString(), [Validators.required]],
          quantity: [dataResponse.quantity, [Validators.required]],
          productBrandId: [dataResponse.productBrandId, [Validators.required]],
        })
      });

      let convertJsonStringToJsObj = JSON.parse(dataResponse.productDetails);
      let convertJsonToJsObj = JSON.parse(convertJsonStringToJsObj);
      this.getDynamicFormData = convertJsonToJsObj;
      // check box
      let checkBoxState: any = [];
      for (const [key, value] of Object.entries(convertJsonToJsObj)) {
        if (value.constructor === Array && key != "productSize") {
          checkBoxState.push(value);

        } else {
          this.userDynamicForm.addControl(key, this.fb.control(value, [Validators.required]));

        }
      }
      // changes of checkbox
      if (checkBoxState.length > 0) {
        let i = 0;

        for (var gettingCheckBoxData of this.subCheckBoxArr) {
          for (var singleCheckBox of checkBoxState) {
            let findingCheckBox = gettingCheckBoxData.checkBoxArr.findIndex(a => a.checkBoxValue == singleCheckBox[i].checkBoxValue);
            gettingCheckBoxData.checkBoxArr[findingCheckBox].check = true;
            i++;
          }
          i = 0;
        }
      }


      if (convertJsonToJsObj.productSize) {
        for (var checkedProductSize of convertJsonToJsObj.productSize) {
          let findingSelectedCheckProductSizeIndex = this.productSizes.findIndex(a => a.sizeName == checkedProductSize);
          if (findingSelectedCheckProductSizeIndex > -1) {
            this.productSizes[findingSelectedCheckProductSizeIndex].check = true;
          }
        }
      }

    });




  }


  // product size
  productSizes: any[] = [{ sizeName: "S", check: false }, { sizeName: "M", check: false }, { sizeName: "L", check: false }, { sizeName: "XL", check: false }];
  selectedProductSize: string[] = [];
  productSizeValid = true;
  changeProductSize(selectedIndex) {
    let selectedCheckBox = this.productSizes[selectedIndex];
    for(var checkBoxSize of this.productSizes){
      if(checkBoxSize.sizeName == selectedCheckBox.sizeName){
        checkBoxSize.check = !checkBoxSize.check;
        break;
      }
    }
  }


  // checkbox
  filterdCheckBoxData: any[] = [];

  checkBoxChanged(event: Event, labelNameOfCheckBoxes: any) {
    let selectCheckData = (event.target as HTMLInputElement).value;
    for (var index in this.fatchedCheckBoxData) {
      let selectedArr = this.fatchedCheckBoxData[index][labelNameOfCheckBoxes];
      if (selectedArr) {
        let findingIndexOfData = selectedArr.findIndex(a => a.checkBoxValue == selectCheckData);
        selectedArr[findingIndexOfData].check = !selectedArr[findingIndexOfData].check;
      }
    }
  }

  // file data change method
  selectedFileData: any[] = [];
  productImagesGetting: any[] = [];
  selectFileslength = [];

  selectedUrl: any[] = [];
  fileChange(myEvent: any, selectedIndex: number) {
    if (this.selectFileslength.length < this.selectedFileData.length + 1) {
      this.validationMesg = "you have been added extra images so, reload the page and redo it again";
    }
    let reader = new FileReader();
    this.selectedFileData.push(<File>myEvent?.target?.files[0]);
    let file = myEvent.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedUrl.push(reader.result);
    }


  }

    // Delete Product
    stopDoubleFuncCalls = false;
    imageDeleting(selectedImgIndex: number) {
      this.stopDoubleFuncCalls = true;

      let getSelectedImageId = this.productImagesGetting[selectedImgIndex].publicId;
      this.DialogService.confirm({
        message: `Are you sure you want to delete image permanantly?`,
        accept: () => {
          this._updateProductService.DeleteImage(getSelectedImageId).subscribe(() => {
            this.productImagesGetting.splice(selectedImgIndex, 1);
            this.selectFileslength.push(1);
          });
        }
      });

    }




  // submitting the update data
  fatchedCheckBoxData: any[] = [];
  CustomInputUpdateDataSubmit() {
    if(!this.stopDoubleFuncCalls){
    let completeDynamicFormData = this.userDynamicForm.value;
    console.log(completeDynamicFormData);

    for (let singleProp in completeDynamicFormData) {
      if (completeDynamicFormData[singleProp] == "") {

        for (var checkBoxData of this.fatchedCheckBoxData) {
          if (singleProp in checkBoxData) {
            completeDynamicFormData[singleProp] = [];
            completeDynamicFormData[singleProp] = checkBoxData[singleProp];
            break;
          }else{
            delete completeDynamicFormData[singleProp];
          }

        }
      }
    }

    let getCommonFormData = completeDynamicFormData.commonInputsOfProducts;
    delete completeDynamicFormData['commonInputsOfProducts'];

    if(this.productSizeValid){
      for(var sizeAdded of this.productSizes){
        if(sizeAdded.check){
          this.selectedProductSize.push(sizeAdded.sizeName);
        }
      }

      completeDynamicFormData = {...completeDynamicFormData, productSize:this.selectedProductSize};
    }


    let convertConvertJsArrToJson = JSON.stringify(completeDynamicFormData);
    let convertJsonObjToJsonString = JSON.stringify(convertConvertJsArrToJson);
    console.log(convertJsonObjToJsonString);



    // for images adding formData object
    const formFrom = new FormData();


    if (this.selectedFileData.length > 0) {
      // adding data to the formData of images which is selected
      for (let i = 0; i < this.selectedFileData.length; i++) {
        formFrom.append(`File`, this.selectedFileData[i], this.selectedFileData[i]?.name);
      }
    }
    formFrom.append("productID", this._activateRoute.snapshot.queryParamMap.get("productId"));
    formFrom.append("productName", getCommonFormData.productName);
    formFrom.append("price", getCommonFormData.price);
    formFrom.append("color", getCommonFormData.color);
    formFrom.append("stockAvailiability", getCommonFormData.stockAvailiability);
    formFrom.append("quantity", getCommonFormData.quantity);
    formFrom.append("productBrandId", getCommonFormData.productBrandId);
    formFrom.append("nestSubCategoryId", this.selectedFormNestCategoryId.toString());
    formFrom.append("productDetails", convertJsonObjToJsonString);

     this._updateProductService.UpdateProduct(formFrom).subscribe((responseData:any)=>{
         this._location.back();
     });

    }
    this.stopDoubleFuncCalls = false;

  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //  this.subscription.unsubscribe();
  }

}
