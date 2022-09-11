import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  messageSendMessage = null;

  constructor(private _contactUs: ContactUsService) { }

  ngOnInit(): void {
  }

  submitContactUsForm(submitForm: NgForm) {
    let customObj = {
      fullName: submitForm.value['FullName'],
      email: submitForm.value['Email'],
      messageTextArea: submitForm.value['MessageBody'],
    }
    submitForm.reset();
    this._contactUs.sendContactUsMessage(customObj).subscribe(() => {
      this.messageSendMessage = "Your email has been send to our team and they will reply to you shortly."
      setTimeout(() => {
        this.messageSendMessage = null;
      }, 4000)
    })
  }

}
