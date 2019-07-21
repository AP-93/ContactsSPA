import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IContact } from '../data/contact';
import { ContactService } from '../contact.service';

@Component({
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css', '../contacts.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title: string = "Edit Contact";
  contact: IContact;
  errorMsg: any;
  idStr: string;
  editEnabled: boolean = false;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.title += " " + id;
    this.contactService.getContactbyId(id).subscribe(
      x => {
        this.contact = x;
      },
      error => this.errorMsg = <any>error
    );
    this.idStr = id;
  }

  deleteContact(): void {
    this.contactService.deleteContact(this.idStr).subscribe(
      result => console.log(result),
      err => console.error(err)

    );
  }
  enableEdit(): void {
    this.editEnabled = !this.editEnabled;
  }
}
