import { Component, OnInit } from '@angular/core';
import { InewContact } from '../data/newContact';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  templateUrl: './contact-add-new.component.html',
  styleUrls: ['./contact-add-new.component.css']
})
export class ContactAddNewComponent implements OnInit {

  newContact: InewContact = {
    firstName: null,
    lastName: null,
    emails: null,
    phoneNumbers: null
  };
  currentEmail: string;
  currentPhoneNum: string;
  postError: boolean = false;
  postErrorMsg: string = "";
  regexpEmail = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
  regexpPhone = new RegExp('^[0-9]{6,20}$');

  constructor(private contactService: ContactService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    this.addAnotherPhoneNum();
    this.addAnotherEmail();

    if (form.valid && this.newContact.phoneNumbers != null) {
      if (this.newContact.emails == null) {
        this.newContact.emails = [];
      }
      this.contactService.postNewContact(this.newContact).subscribe(
        value => {
          this.postErrorMsg = "SUCCES";
          this.postError = true;
          window.location.reload();
        },
        error => {
          this.postErrorMsg = error;
          this.postError = true;
        }
      )
    }
    else {
      this.postErrorMsg = "INVALID FORM";
      this.postError = true;
    }
  }

  addAnotherEmail(): void {
    if (this.newContact.emails != null && this.regexpEmail.test(this.currentEmail)) {
      this.newContact.emails.push(this.currentEmail);
      this.currentEmail = "";
    }
    else if (this.currentEmail != null && this.regexpEmail.test(this.currentEmail)) {
      this.newContact.emails = [this.currentEmail];
      this.currentEmail = "";
    }
  }

  deleteAddedEmail(str: string): void {
    const index: number = this.newContact.emails.indexOf(str);
    if (index !== -1) {
      this.newContact.emails.splice(index, 1);
    }
  }

  addAnotherPhoneNum(): void {
    if (this.newContact.phoneNumbers != null && this.regexpPhone.test(this.currentPhoneNum)) {
      this.newContact.phoneNumbers.push(this.currentPhoneNum);
      this.currentPhoneNum = "";
    }
    else if (this.currentPhoneNum != null && this.regexpPhone.test(this.currentPhoneNum)) {
      this.newContact.phoneNumbers = [this.currentPhoneNum];
      this.currentPhoneNum = "";
    }
  }

  deleteAddedPhoneNum(str: string): void {
    const index: number = this.newContact.phoneNumbers.indexOf(str);
    if (index !== -1) {
      this.newContact.phoneNumbers.splice(index, 1);
    }
  }
}