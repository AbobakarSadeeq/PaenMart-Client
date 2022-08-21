import { trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdminHeaderService } from '../../admin-header/admin-header.service';
import { AdminService } from '../../admin.service';
import { CategoryService } from '../../products-menu/category/category.service';
import { NestSubCategoryService } from '../../products-menu/nest-sub-category/nest-sub-category.service';
import { SubCategoryService } from '../../products-menu/sub-category/sub-category.service';
import { DynamicFormStructureService } from './dynamic-form-structure.service';
@Component({
  selector: 'app-dynamic-form-structure',
  templateUrl: './dynamic-form-structure.component.html',
  styleUrls: ['./dynamic-form-structure.component.css']
})
export class DynamicFormStructureComponent implements OnInit {

  // navbar
  getStyleFromNav: string = null;



  // both forms prop
  creatingFormReactive: FormGroup;
  userDynamicForm: FormGroup;

  // photos input functionality
  photoAlreadyAdded = false;
  selectFileslength = [];
  selectedFileData: any[] = [];

  // database data
  userMadeForm: { inputType: string, labelName: any, nameOfInput: string, placeHolder: string, inputValue: string | number | boolean }[] = [];

  // Dynamic Radio/checkbox/select-list Buttons adding
  addedRadioCheckboxBtnQuantity: string[] = [];
  selectQuantityShows = null;
  againSelectedDifferentQty = true;
  selectedInputName = null;
  selectInputQuantity = true;
  filterdCheckBoxData: { labelNameData: string, selectedAllCheckBoxData: Array<string> };
  customizeArrayCheckBox = [];
  checkBoxChecked = false;

  // validation
  placeHolderValidPlaces = true;


  // categoires selected or not
  isCategoiresValid = false;

  // Sending structure to backend button
  insertDynamicIsValid = false;

  // show message when input added
  showfadeMessageWhenInputAdded: any = null;

  subscription: Subscription;


  constructor(private _adminService: AdminService,
    private fb: FormBuilder, private fb2: FormBuilder,
    private _categoryService: CategoryService,
    private _subCategoriesService: SubCategoryService,
    private _nestSubCatgories: NestSubCategoryService,
    private _dynamicFormStructure: DynamicFormStructureService,
    private DialogService: ConfirmationService,
    private _adminHeaderService: AdminHeaderService) { }

  ngOnInit(): void {

    // hard-coded form to create inputs
    this.creatingFormReactive = this.fb.group({
      selectingInputs: [null, [Validators.required]],
      inputLabel: this.fb.array([this.fb.group({ multipleOptionValue: ['', [Validators.required]] })]),
      nameInput: ['', Validators.required],
      placeholderInput: ['', Validators.required]
    });

    // dynamically form added data
    this.userDynamicForm = this.fb2.group({});

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    })


    // call all categoires when component render
    this.getAllCategories();

    // call all DFSList
    this.getDynamicFormStructureList();
  }


  // ------ Categoires-Selecting ------
  selectedCategoiresNames = false;
  categoriesSelectingDone = true;
  submitCategoiresBtn = true;

  // ------ Getting Categories ------
  categories: any[] = [];
  categorySelectedName: string;
  getAllCategories() {
    this.subscription = this._categoryService.GetAll().subscribe((data: any) => {
      this.categories = data;
    })
  }

  categorySelected(selectedCategoryIdEvent: Event) {
    let getCategoryIdFromEvent: number = +(selectedCategoryIdEvent.target as HTMLInputElement).value;
    this.getAllSubcategoires(getCategoryIdFromEvent);
    this.nestSubCategories = [];
    this.categorySelectedName = this.categories.find(a => a.categoryID == getCategoryIdFromEvent).categoryName
    this.nestSubCategorySelectedData = null;
    this.submitCategoiresBtn = true;
  }

  // ------ getting sub categories ------

  showSubCategory = false;
  subCategories: any[] = [];
  subCategorySelectedName: string;
  getAllSubcategoires(filterCategoryId: number) {
    this.showSubCategory = true;
    this.subscription = this._subCategoriesService.GetAll().subscribe((data: any) => {
      this.subCategories = data.filter(a => a.categoryId == filterCategoryId);
    });
  }

  subCategorySelected(selectedSubCategoryIdEvent: Event) {
    let getSubCategoryIdFromEvent: number = +(selectedSubCategoryIdEvent.target as HTMLInputElement).value;
    this.getNestSubCategories(getSubCategoryIdFromEvent);
    this.subCategorySelectedName = this.subCategories.find(a => a.subCategoryID == getSubCategoryIdFromEvent).subCategoryName
    this.nestSubCategorySelectedData = null;
    this.submitCategoiresBtn = true;
  }

  // ------ getting nest-sub-categories ------

  showNestSubCategory = false;
  nestSubCategories: any[] = [];
  nestSubCategorySelectedData: any;
  productSizeTabValid = true;

  getNestSubCategories(filterSubCategoryId: number) {
    this.showNestSubCategory = true;
    this.subscription = this._nestSubCatgories.GetAll().subscribe((data: any) => {
      this.nestSubCategories = data.filter(a => a.subCategoryId == filterSubCategoryId);
      for (var indexArr = 0; indexArr < this.nestSubCategories.length; indexArr++) {
        let foundNestCategoryInList = {
          nestSubCategoryID: this.nestSubCategories[indexArr].nestSubCategoryID,
          nestSubCategoryName: this.nestSubCategories[indexArr].nestSubCategoryName,
          subCategoryId: this.nestSubCategories[indexArr].subCategoryId,
          subCategoryName: this.nestSubCategories[indexArr].subCategoryName, foundInList: false
        };
        this.nestSubCategories[indexArr] = foundNestCategoryInList;

        if (this.dynamicFormStructure.find(a => a.nestSubCategoryId == this.nestSubCategories[indexArr].nestSubCategoryID)) {
          this.nestSubCategories[indexArr].foundInList = true;
        } else {


        }
      }
    });

  }

  selectedNestSubCategories(selectedNestSubCategoryIdEvent: Event) {
    let getNestSubCategoryIdFromEvent: number = +(selectedNestSubCategoryIdEvent.target as HTMLInputElement).value;
    this.nestSubCategorySelectedData = this.nestSubCategories.find(a => a.nestSubCategoryID == getNestSubCategoryIdFromEvent);

    this.submitCategoiresBtn = false;
  }

  // Selected All categories
  categoriesSelectedDone() {
    this.categoriesSelectingDone = false;
    this.selectedCategoiresNames = true;
    this.isCategoiresValid = true;
    this.productSizeTabValid = false;
  }


  // product size handler
  isProductSizeSelected = null;
  productSizeSelectedHandler(event: Event) {
    let productSizeSelectedValue = (event.target as HTMLInputElement).value;
    this.isProductSizeSelected = productSizeSelectedValue;
  }




  // ------- Hard-coded form -------

  // selecting what input add
  ChangeInput(event: Event) {
    let selectedData = (event.target as HTMLInputElement).value;
    console.log(selectedData);
    this.selectedInputName = selectedData;
    if (selectedData == "radio" || selectedData == "checkbox" || selectedData == "file") {
      this.placeHolderValidPlaces = false;
      this.creatingFormReactive.controls['placeholderInput'].setValue("null");
    } else {
      this.placeHolderValidPlaces = true;
      this.creatingFormReactive.controls['placeholderInput'].setValue("");
    }

    if (selectedData == "radio" || selectedData == "checkbox" || selectedData == "selectList" || selectedData == "file") {
      this.selectQuantityShows = true;
    } else {
      this.selectQuantityShows = null;
      (<FormArray>this.creatingFormReactive.get("inputLabel")).clear();
      (<FormArray>this.creatingFormReactive.get("inputLabel")).push(this.fb.group({ multipleOptionValue: ['', [Validators.required]] }));
    }
  }



  // Selecting And adding options to the form
  // when input selected then according to the value the logic will apply in this algo
  addQuantitySelectingOfRCSBtn(event: Event) {
    // files/photo
    if (this.selectedInputName == "file") {
      if (this.againSelectedDifferentQty) {
        let quantityFilesSelected = +(event.target as HTMLInputElement).value;
        // fake array because template didnt do for loop so i need it for files to do
        for (var i = 1; i <= quantityFilesSelected; i++) {
          this.selectFileslength.push(i);
        }

      } else {
        this.selectFileslength = [];
        let quantityFilesSelected = +(event.target as HTMLInputElement).value;
        // fake array because template didnt do for loop so i need it for files to do
        for (var i = 1; i <= quantityFilesSelected; i++) {
          this.selectFileslength.push(i);
        }
      }

    } else {
      // checkbox/radio/text/number/select-list
      if (this.againSelectedDifferentQty) {
        let quantity = +(event.target as HTMLInputElement).value;
        for (var i = 0; i < quantity - 1; i++) {
          (<FormArray>this.creatingFormReactive.get("inputLabel")).push(this.fb.group({ multipleOptionValue: ['', [Validators.required]] }));
        }
      } else {
        (<FormArray>this.creatingFormReactive.get("inputLabel")).clear();
        let quantity = +(event.target as HTMLInputElement).value;
        for (var i = 0; i < quantity; i++) {
          (<FormArray>this.creatingFormReactive.get("inputLabel")).push(this.fb.group({ multipleOptionValue: ['', [Validators.required]] }));
        }
      }

    }

    this.againSelectedDifferentQty = false;

    // validation error message removing
    this.selectInputQuantity = false;
  }

  getAddQuantitySelectingOfRCSBtn() {
    return (this.creatingFormReactive.get('inputLabel') as FormArray).controls;
  }


  // Save or Add single input at a time to the dynamic form
  SaveInput() {
    let singleInputData: any = {
      inputType: this.creatingFormReactive.value.selectingInputs,
      labelName: this.creatingFormReactive.value.inputLabel,
      nameOfInput: this.creatingFormReactive.value.nameInput,
      placeHolder: this.creatingFormReactive.value.placeholderInput,
      inputValue: "",
    };


    // if input is number/ text then assign label value to name field
    if (singleInputData.inputType == 'text' || singleInputData.inputType == 'number') {
      singleInputData.nameOfInput = singleInputData.labelName[0].multipleOptionValue;
    }

    // if once filed or photos added to the form then cannot add it again
    if (singleInputData.inputType == "file") {
      this.photoAlreadyAdded = true;
      singleInputData = { ...singleInputData, numberOfChooseFileInputs: this.selectFileslength.length };

    }
    // if photo added then dont show the error
    if(this.photoAlreadyAdded){
      this.AddPhotoCompulsory = null;
    }

    // we will send this complete array to the database when it is confirm button pressed and store there and this array holds the dynamic form structure.
    this.userMadeForm.push(singleInputData);

    // create another form and now add that controls to that dynamic form at a single time
    this.userDynamicForm.addControl(this.creatingFormReactive.value.nameInput, this.fb2.control("", [Validators.required]));

    // button validion
    this.creatingFormReactive.reset();
    this.placeHolderValidPlaces = true;
    this.selectQuantityShows = null;
    (<FormArray>this.creatingFormReactive.get("inputLabel")).clear();
    (<FormArray>this.creatingFormReactive.get("inputLabel")).push(this.fb.group({ multipleOptionValue: ['', [Validators.required]] }));



    this.insertDynamicIsValid = true;

    this.showfadeMessageWhenInputAdded = "Input added to the given category form";
    setTimeout(() => {
      this.showfadeMessageWhenInputAdded = null;
    }, 2500);


    // when update clicked then this method execute if condition is valid
    if (this.updateFormBtnClicked) {
      this.updateFetchedDFSData.push(singleInputData);
      this.updateDynamicIsValid = true;
    }

  }

  // Crud table making
  displayAddDynamicFormStructureModel = false;
  displayUpdateDynamicFormStructureModel = false;

  // Adding form

  showAddDynamicFormModel() {
    this.displayAddDynamicFormStructureModel = true;
    this.getAllCategories();
  }

  AddPhotoCompulsory = null;
  InsertDynamicFormStructure() {

    if (!this.photoAlreadyAdded) {
      this.AddPhotoCompulsory = "Sorry product must have photos so, you have to add it"
      return;
    }


    let convertJSArrToJsonArr = JSON.stringify(this.userMadeForm);
    let sendingFilterDataToServer = {
      formStructure: convertJSArrToJsonArr,
      nestSubCategoryId: this.nestSubCategorySelectedData.nestSubCategoryID,
      productSize: this.isProductSizeSelected == null ? false : this.isProductSizeSelected
    };
    this._dynamicFormStructure.Insert(sendingFilterDataToServer).subscribe(() => {
      this.getDynamicFormStructureList();
    });

    this.userMadeForm = [];
    this.insertDynamicIsValid = false;
    this.displayAddDynamicFormStructureModel = false;
    this.photoAlreadyAdded = false;
    this._adminHeaderService.productFormAdded.next({ nestSubCategoryName: this.nestSubCategorySelectedData.nestSubCategoryName });
    this.isProductSizeSelected = null;
  }




  // Get-list form

  dynamicFormStructure: any[] = [];
  getDynamicFormStructureList() {
    this.subscription = this._dynamicFormStructure.GetAll().subscribe((data: any) => {
      this.dynamicFormStructure = data;
    });
  }

  // delete DFS
  onDeleteDFS(Id: number, nestSubCategoryName: string) {

    this.DialogService.confirm({
      message: 'Are you sure you want to Delete this <strong>' + nestSubCategoryName + '</strong> category form',
      accept: () => {
        this._dynamicFormStructure.DeleteData(Id).subscribe(() => {
          this.getDynamicFormStructureList();
        })
      }
    });


  }

  deletingFetchingDFSInput: any[] = [];
  confirmDeleteSingleInput = false;
  deleteSingleInputOfForm(index: number) {
    this.deletingFetchingDFSInput.splice(index, 1);
    this.confirmDeleteSingleInput = true;
  }

  confrimDeleteInput() {
    let convertJSArrToJsonArr = JSON.stringify(this.deletingFetchingDFSInput);
    let sendingFilterDataToServer = {
      formStructure: convertJSArrToJsonArr,
      nestSubCategoryId: this.selectedNestSubCategoryId,
      dynamicFormStructureID: this.selectedDynamicFormStructureID
    };
    this._dynamicFormStructure.UpdateData(sendingFilterDataToServer).subscribe(() => {
      this.getDynamicFormStructureList();
    });

    this.displayUpdateDynamicFormStructureModel = false;
    this.confirmDeleteSingleInput = false;
    this.showfadeMessageWhenUpdateDynamicFormStructureAdded = `${this.selectedFormNestCatgoryName} form data has been updated`;
    setTimeout(() => {
      this.showfadeMessageWhenUpdateDynamicFormStructureAdded = null;
    }, 2500);
  }



  // update DFS

  fetchingDFS: any[] = [];
  updateFetchedDFSData: any[] = [];
  updateFormBtnClicked = false;
  updateDynamicIsValid = false;
  selectedNestSubCategoryId: number;
  selectedDynamicFormStructureID: number;
  showfadeMessageWhenUpdateDynamicFormStructureAdded = null;
  selectedFormNestCatgoryName = null;
  getProductSizeValue = null;
  editProductSizeAllow = false;

  getDataForUpdate(Id: number, nestCategoryName: string) {
    this.selectFileslength = [];
    this.updateFormBtnClicked = true;
    this.selectedFormNestCatgoryName = nestCategoryName;
    this.displayUpdateDynamicFormStructureModel = true;
    let countAddedFileInputs = 0;
    this.subscription = this._dynamicFormStructure.get(Id).subscribe((data: any) => {

      this.getProductSizeValue = data.productSize;
      let convertToJsArrObj = JSON.parse(data?.formStructure);
      console.log(convertToJsArrObj);
      if(convertToJsArrObj.findIndex(a=>a.inputType == 'file') == -1){
          this.AddPhotoCompulsory = "Sorry product must have photos so, you have to add it"
      }

      for (var a of convertToJsArrObj) {
        if (a.inputType == 'file') {
          countAddedFileInputs = a.numberOfChooseFileInputs;
          this.photoAlreadyAdded = true;
          break;
        }
      }

      for (var i = 1; i <= countAddedFileInputs; i++) {
        this.selectFileslength.push(i);
      }

      this.fetchingDFS = convertToJsArrObj;
      this.deletingFetchingDFSInput = JSON.parse(data?.formStructure);
      this.selectedNestSubCategoryId = data.nestSubCategoryId;
      this.selectedDynamicFormStructureID = data.dynamicFormStructureID;



    });



    this.updateFetchedDFSData = this.fetchingDFS;
    this.updateFetchedDFSData = [];


  };


  SendUpdateDynamicFormStructureData() {

    if (!this.photoAlreadyAdded) {
      this.AddPhotoCompulsory = "Sorry product must have photos so, you have to add it"
      return;
    }


    let mergeTwoArr = [...this.fetchingDFS, ...this.updateFetchedDFSData];
    let convertJSArrToJsonArr = JSON.stringify(mergeTwoArr);
    let sendingFilterDataToServer = {
      formStructure: convertJSArrToJsonArr,
      nestSubCategoryId: this.selectedNestSubCategoryId,
      dynamicFormStructureID: this.selectedDynamicFormStructureID,
      productSize: this.isProductSizeSelected == null ? this.getProductSizeValue : this.isProductSizeSelected
    };

    this._dynamicFormStructure.UpdateData(sendingFilterDataToServer).subscribe(() => {
      this.getDynamicFormStructureList();
    });

    this.displayUpdateDynamicFormStructureModel = false;

    this.showfadeMessageWhenUpdateDynamicFormStructureAdded = `${this.selectedFormNestCatgoryName} form data has been updated`;
    setTimeout(() => {
      this.showfadeMessageWhenUpdateDynamicFormStructureAdded = null;
    }, 2500);

    this.isProductSizeSelected = null;
  }



  removeErrorMessage() {
    this.AddPhotoCompulsory = null;
    this.userMadeForm = [];
    this.selectedCategoiresNames = false;
    this.categoriesSelectingDone = true;
    this.categories = [];
    this.subCategories = [];
    this.showSubCategory = false;
    this.nestSubCategories = [];
    this.showNestSubCategory = false;
    this.isCategoiresValid = false;
    this.submitCategoiresBtn = true;
    this.insertDynamicIsValid = false;
    this.updateFormBtnClicked = false;
    this.updateFetchedDFSData = [];
    this.fetchingDFS = [];
    this.updateDynamicIsValid = false;
    this.confirmDeleteSingleInput = false;
    this.photoAlreadyAdded = false;
    this.isProductSizeSelected = null;
    this.editProductSizeAllow = false;
    this.productSizeTabValid = true;
    this.creatingFormReactive = this.fb.group({
      selectingInputs: [null, [Validators.required]],
      inputLabel: this.fb.array([this.fb.group({ multipleOptionValue: ['', [Validators.required]] })]),
      nameInput: ['', Validators.required],
      placeholderInput: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }


}
