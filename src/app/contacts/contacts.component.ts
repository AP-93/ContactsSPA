import { Component, OnInit } from '@angular/core';
import { IContact } from './data/contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  _listFilter: string;
  filteredContacts: IContact[];
  contacts: IContact[];
  private _contactService;
  errorMsg: string;

  constructor(contactService: ContactService) {
    this._contactService = contactService;
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredContacts = this._listFilter ? this.filterByName(this._listFilter) : this.contacts;
  }

  filterByName(filterBy: string): IContact[] {
    filterBy = filterBy.toLowerCase();
    return this.contacts.filter((contact: IContact) => (contact.firstName + contact.lastName).toLowerCase().indexOf(filterBy) > -1)
  }

  ngOnInit(): void {
    this._contactService.getContacts().subscribe(
      x => {
        this.contacts = x;
        this.filteredContacts = this.contacts;
      },
      error => this.errorMsg = <any>error
    );
  }
}
