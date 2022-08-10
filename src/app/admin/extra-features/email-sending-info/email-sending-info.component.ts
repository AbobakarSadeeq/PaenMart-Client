import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AdminService } from '../../admin.service';
import { ExtraFeaturesService } from '../extra-features.service';

@Component({
  selector: 'app-email-sending-info',
  templateUrl: './email-sending-info.component.html',
  styleUrls: ['./email-sending-info.component.css']
})
export class EmailSendingInfoComponent implements OnInit {
  getStyleFromNav: string = null;
  subscription: Subscription;
  getEmailInfoDetail: any[] = [];
  emailInfoForm: FormGroup;
  showAddSendingBtn = false;

  constructor(private _adminService: AdminService, private _extraFeaturesService: ExtraFeaturesService,
    private _fb: FormBuilder) { }

  ngOnInit(): void {

    this._adminService.sideBar.subscribe((data: string) => {
      this.getStyleFromNav = data;
    });

    this.emailInfoForm = this._fb.group({
      appPassword: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required]],

    });

    this.getEmailInfo();

  }

  showModel = false;
  showAddSendingEmailModel() {
    this.showModel = true;
  }

  getEmailInfo() {
    this.subscription = this._extraFeaturesService.getSendingEmailData().subscribe((data: any) => {
      this.getEmailInfoDetail = [];
      if (data) {
        this.getEmailInfoDetail.push(data);
        this.showAddSendingBtn = false;
      } else {
        this.showAddSendingBtn = true;
      }



    });
  }

  emailValidaton = false;
  sendingEmailInfo() {
    let emailInfoObj = {
      appPassword: this.emailInfoForm.value['appPassword'],
      ownerEmail: this.emailInfoForm.value['ownerEmail']
    }

    if (!emailInfoObj.ownerEmail.includes("@gmail.com")) {
      this.emailValidaton = true;
      return;
    }

    this._extraFeaturesService.AddSendingEmailData(emailInfoObj).subscribe((data: any) => {
      this.getEmailInfo();
    })

    this.showModel = false;
    this.emailValidaton = false;


  }

  updateModel = false;
  showUpdateModel() {
    this.updateModel = true;
    this.emailInfoForm = this._fb.group({
      appPassword: [this.getEmailInfoDetail[0]?.appPassword, [Validators.required]],
      ownerEmail: [this.getEmailInfoDetail[0]?.ownerEmail, [Validators.required]]
    });
  }

  updatingEmailInfo() {
    let emailInfoObj = {
      appPassword: this.emailInfoForm.value['appPassword'],
      ownerEmail: this.emailInfoForm.value['ownerEmail']
    }


    if (!emailInfoObj.ownerEmail.includes("@gmail.com")) {
      this.emailValidaton = true;
      return;
    }

    this._extraFeaturesService.updateSendingEmailData(emailInfoObj).subscribe((data: any) => {
      this.getEmailInfo();
    })

    this.updateModel = false;
    this.emailValidaton = false;
  }

  removeErrorMessage() {

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
