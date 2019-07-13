import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IContact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title: string = "Edit Contact";
  contact: IContact;
  errorMsg: any;

  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.title += " " + id
    this.contactService.getContactbyId(id).subscribe(
      x => {
        this.contact = x;
      },
      error => this.errorMsg = <any>error
    );
  }
}
