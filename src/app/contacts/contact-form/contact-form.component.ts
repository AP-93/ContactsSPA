import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { IContact, IEmail, IPhoneNum } from '../data/contact';
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css', '../contacts.component.css']
})
export class ContactFormComponent implements OnInit {

  pageTitle: string = "Add New Contact";
  contactForm: FormGroup;
  contact: IContact;

  get emails(): FormArray {
    return <FormArray>this.contactForm.get('emails');
  }
  get phoneNumbers(): FormArray {
    return <FormArray>this.contactForm.get('phoneNumbers');
  }
  get lastEmailBox(): FormControl {
    var i = (this.emails.length - 1).toString();
    return <FormControl>this.emails.get(i);
  }
  errorMessage: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emails: this.fb.array([
        this.fb.group({
          id: [0],
          email: ["", Validators.email],
          contactID: [0]
        })
      ]),
      phoneNumbers: this.fb.array([
        this.fb.group({
          id: [0],
          phoneNum: ["", [Validators.required, Validators.pattern(/^[0-9]{5,20}$/)]],
          contactID: [0]
        })
      ])
    })
    let id = this.route.snapshot.paramMap.get('id');
    if (id != "0") {
      this.pageTitle = "Edit Contact";
      this.getContact(id);
    }
  }
  getContact(id: string): void {
    this.contactService.getContactbyId(id)
      .subscribe(
        (contact: IContact) => this.displayContact(contact),
        (error: any) => this.errorMessage = <any>error
      );
  }
  displayContact(contact: IContact): void {
    this.contact = contact;
    // Update  data in form
    this.contactForm.patchValue({
      id: this.contact.id,
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
    });
    //update phone numbers
    this.setPhoneNumbers(this.contact.phoneNumbers);
    //update emails if any
    if (this.contact.id > 0 && this.contact.emails != null && this.contact.emails.length > 0) {
      this.setEmailAddresses(this.contact.emails);
    }
    this.contactForm.disable();
  }

  setEmailAddresses(addresses: IEmail[]) {
    let control = this.fb.array([]);
    addresses.forEach(x => {
      control.push(this.fb.group({
        id: x.id,
        email: [x.email, Validators.email],
        contactID: x.contactID
      }))
    })
    this.contactForm.setControl('emails', control);
  }
  setPhoneNumbers(numbers: IPhoneNum[]) {
    let control = this.fb.array([]);
    numbers.forEach(x => {
      control.push(this.fb.group({
        id: x.id,
        phoneNum: [x.phoneNum, [Validators.required, Validators.pattern(/^[0-9]{5,20}$/)]],
        contactID: x.contactID
      }))
    })
    this.contactForm.setControl('phoneNumbers', control);
  }
  addEmail(): void {
    this.emails.push(this.fb.group({
      id: [0],
      email: ["", Validators.email],
      contactID: [0] 
    }))
  }
  deleteEmail(index: number): void {
    if (this.emails.length > 1)//prevent user deleting all input fields
      this.emails.removeAt(index);
    else {
      this.emails.get(index.toString()).patchValue({
        id: 0,
        email: "",
        contactID: 0 
      })
    }
  }
  addPhoneNum(): void {
    this.phoneNumbers.push(this.fb.group({
      id: [0],
      phoneNum: ["", [Validators.required, Validators.pattern(/^[0-9]{5,20}$/)]],
      contactID: [0]
    }))
  }
  deletePhoneNum(index: number): void {
    if (this.phoneNumbers.length > 1)
      this.phoneNumbers.removeAt(index);
    else {
      this.phoneNumbers.get(index.toString()).patchValue({
        id: 0,
        contactID: 0,
        phoneNum: ""
      })
    }
  }
  save(): void {
    if (this.contactForm.valid) {
      const p = { ...this.contact, ...this.contactForm.value };
      if (p.id === 0) {
        this.contactService.postNewContact(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error);
      } else {
        this.contactService.updateContact(p.id, p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  onSaveComplete(): void {
    this.contactForm.reset();
    this.router.navigate(['/contacts']);
  }
  deleteContact(): void {
    this.contactService.deleteContact(this.contact.id.toString()).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error);
  }
}
