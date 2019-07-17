import { Component, OnInit } from '@angular/core';
import { InewContact } from './newContact';
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
  postError: boolean;

  constructor(private contactService: ContactService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.contactService.postNewContact(this.newContact).subscribe();
    }
    else {
      console.log("onsubmit: ", form.valid);
    }
  }
}
