import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { single, Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;


  // Employee
  Employees: any[] = [];
  updateEmployeeForm: FormGroup;

  userRoleId: string;
  allRoles: any[] = [];

  // shipper
  updateShipperForm: FormGroup;

  // Add user
  userAddForm: FormGroup;

  constructor(private _adminService: AdminService,
    private _fb: FormBuilder,
    private DialogService: ConfirmationService,
    private _userService: UserService) { }

  ngOnInit(): void {


    // user
    this.subscription = this._userService.getListRole().subscribe((data: any) => {
      for (var singleRole of data) {
        if (singleRole.name == "User") {
          this.userRoleId = singleRole.id;
        }


        if (singleRole.name != "Admin") {
          this.allRoles.push(singleRole);
        }

      }
    });

    // sidebar expand and collaps styling required in every admin page
    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });


    // Employee
    this.getEmployees();
    this.updateEmployeeForm = this._fb.group({
      dathOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      employeeHireDate: ['', [Validators.required]],
    });


    // shipper
    this.updateShipperForm = this._fb.group({
      dathOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      shipperHireDate: ['', [Validators.required]],
      vehiclePlatNo: ['', [Validators.required]],
      shipmentVehicleType: ['', [Validators.required]],

    });


    // Add User
    this.userAddForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dathOfBirth: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      homeAddress: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      vehiclePlatNo: ['', [Validators.required]],
      shipmentVehicleType: ['', [Validators.required]],
      email: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
    })


  }


  // Employees
  getEmployees() {
    this.subscription = this._userService.GetAllEmployees().subscribe((data: any) => {
      this.Employees = data;
    });
  }


  showUpdateEmployeeDialog = false;
  getDataForUpdate(userId: string) {
    this.subscription = this._userService.GetUser(userId).subscribe((data: any) => {
      this.showUpdateEmployeeDialog = true;
      this.updateEmployeeForm = this._fb.group({
        salary: [data.salary, [Validators.required]],
        phoneNumber: [data.phoneNumber, [Validators.required]],
        homeAddress: [data.homeAddress, [Validators.required]],
        gender: [data.gender, [Validators.required]],
        dathOfBirth: [data.dathOfBirth, [Validators.required]],
        employeeHireDate: [data.employeeHireDate, [Validators.required]],
        userId: [userId, [Validators.required]]
      });
    });

  }

  onUpdateEmployee() {
    let updateEmpObj = {
      salary: this.updateEmployeeForm.value['salary'],
      phoneNumber: this.updateEmployeeForm.value['phoneNumber'],
      homeAddress: this.updateEmployeeForm.value['homeAddress'],
      gender: this.updateEmployeeForm.value['gender'],
      dathOfBirth: this.updateEmployeeForm.value['dathOfBirth'],
      hireDate: this.updateEmployeeForm.value['employeeHireDate'],
      userId: this.updateEmployeeForm.value['userId']
    };
    this._userService.UpdateUserData(updateEmpObj).subscribe((data: any) => {
      this.getEmployees();
      this.showUpdateEmployeeDialog = false;
    });

  }

  onDeleteEmployee(userId: string) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Employee?',
      accept: () => {
        this._userService.DeleteData(userId).subscribe((data: any) => {
          this.getEmployees();
        })
      }
    });

  }

  displayModal: boolean = false;
  employeeDetail: any;
  ShowEmployeeDetail(userId: string) {
    this.displayModal = true;
    this.subscription = this._userService.GetUser(userId).subscribe((data: any) => {
      this.employeeDetail = data;
    })
  }

  // Simple Users
  users: any[] = [];
  getAllUsers() {
    this.subscription = this._userService.GetAllUsers(this.userRoleId).subscribe((data: any) => {
      this.users = data;
    });
  }

  onDeleteUser(userId: string) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete User?',
      accept: () => {
        this._userService.DeleteData(userId).subscribe((data: any) => {
          this.getAllUsers();
        })
      }
    });

  }

  // Shipper

  shippers: any[] = [];
  getShippers() {
    this.subscription = this._userService.GetAllShipper().subscribe((data: any) => {
      this.shippers = data;
    })
  }

  shipperDetails: any;
  shipperDisplayModal: boolean = false;
  ShowShipperDetail(userId: string) {
    this.subscription = this._userService.GetUser(userId).subscribe((data: any) => {
      this.shipperDetails = data;
      this.shipperDisplayModal = true;
    })
  }

  showUpdateShipperDialog = false;
  getDataForShipperUpdate(userId: string) {
    this.subscription = this._userService.GetUser(userId).subscribe((data: any) => {
      this.showUpdateShipperDialog = true;
      this.updateShipperForm = this._fb.group({
        salary: [data.salary, [Validators.required]],
        phoneNumber: [data.phoneNumber, [Validators.required]],
        homeAddress: [data.homeAddress, [Validators.required]],
        gender: [data.gender, [Validators.required]],
        dathOfBirth: [data.dathOfBirth, [Validators.required]],
        shipperHireDate: [data.shipperHireDate, [Validators.required]],
        vehiclePlatNo: [data.vehiclePlatNo, [Validators.required]],
        shipmentVehicleType: [data.shipmentVehicleType, [Validators.required]],
        userId: [userId, [Validators.required]]
      });
    });
  }


  onUpdateShipper() {
    let updateShipperObj = {
      salary: this.updateShipperForm.value['salary'],
      phoneNumber: this.updateShipperForm.value['phoneNumber'],
      homeAddress: this.updateShipperForm.value['homeAddress'],
      gender: this.updateShipperForm.value['gender'],
      dathOfBirth: this.updateShipperForm.value['dathOfBirth'],
      hireDate: this.updateShipperForm.value['shipperHireDate'],
      vehiclePlatNo: this.updateShipperForm.value['vehiclePlatNo'],
      shipmentVehicleType: this.updateShipperForm.value['shipmentVehicleType'],
      userId: this.updateShipperForm.value['userId']
    };
    this._userService.UpdateUserData(updateShipperObj).subscribe((data: any) => {
      this.getShippers();
      this.showUpdateShipperDialog = false;
    });

  }

  onDeleteShipper(userId: string) {
    this.DialogService.confirm({
      message: 'Are you sure you want to Delete Shipper?',
      accept: () => {
        this._userService.DeleteData(userId).subscribe((data: any) => {
          this.getShippers();
        })
      }
    });
  }



  changeUserTab(event: any) {

    if (event.index == 0) {
      // employee
      this.getEmployees();


    } else if (event.index == 1) {
      // shipper
      this.getShippers();



    } else if (event.index == 2) {
      // user
      this.getAllUsers();
    }

  }


  // Add Users
  displayAddUserModel = false;
  selectRoleFirst = false;
  showUsersAddModel() {
    this.selectRoleFirst = true;
    this.displayAddUserModel = true;
    this.emailValidaton = "";

  }

  showEmployeesInputs = false;
  showShipperInputs = false;
  showUserInputs = false;

  selectedRoleName = "";
  selectingRole(event: any) {
    this.selectRoleFirst = false;
    this.selectedRoleName = event.target.value;
    if (event.target.value == "Employee") {
      this.showEmployeesInputs = true;

    } else if (event.target.value == "Shipper") {
      this.showShipperInputs = true;


    } else if (event.target.value == "User") {
      this.showUserInputs = true;
    }
  }

  emailValidaton = "";
  onSaveUser() {
    let userDataObj = {};
    debugger;
    if (this.selectedRoleName == "User") {
      userDataObj = {
        firstName: this.userAddForm.value['firstName'],
        lastName: this.userAddForm.value['lastName'],
        email: this.userAddForm.value['email'],
        userPassword: this.userAddForm.value['userPassword'],
        salary: "00",
        phoneNumber: "00",
        homeAddress: "00",
        gender: "00",
        dathOfBirth: "00",
        hireDate: "00",
        vehiclePlatNo: "00",
        shipmentVehicleType: "00",
        roleName: this.selectedRoleName
      }
    } else {
      userDataObj = {
        firstName: this.userAddForm.value['firstName'],
        lastName: this.userAddForm.value['lastName'],
        email: this.userAddForm.value['email'],
        userPassword: this.userAddForm.value['userPassword'],
        salary: this.userAddForm.value['salary'],
        phoneNumber: this.userAddForm.value['phoneNumber'],
        homeAddress: this.userAddForm.value['homeAddress'],
        gender: this.userAddForm.value['gender'],
        dathOfBirth: this.userAddForm.value['dathOfBirth'],
        hireDate: this.userAddForm.value['hireDate'],
        vehiclePlatNo: this.userAddForm.value['vehiclePlatNo'],
        shipmentVehicleType: this.userAddForm.value['shipmentVehicleType'],
        roleName: this.selectedRoleName
      };
    }

    if (!this.userAddForm.value['email'].includes("@gmail.com")) {
      this.emailValidaton = "Please give the gmail Id";
      return;
    }

    this._userService.Insert(userDataObj).subscribe((data: any) => {
      this.getAllUsers();
      this.getEmployees();
      this.getShippers();
      this.userAddForm.reset();
      this.displayAddUserModel = false;
      this.showEmployeesInputs = false;
      this.showShipperInputs = false;
      this.showUserInputs = false;
      this.emailValidaton = "";
    },
      (error: any) => {
        this.emailValidaton = error.error;
      });


  }


  removeErrorMessage() {
    this.showEmployeesInputs = false;
    this.showShipperInputs = false;
    this.showUserInputs = false;
    this.selectRoleFirst = true;
    this.userAddForm.reset();

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
