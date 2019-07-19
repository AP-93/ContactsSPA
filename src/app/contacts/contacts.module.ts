import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactAddNewComponent } from './contact-add-new/contact-add-new.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsComponent } from './contacts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactDetailsComponent,
    ContactAddNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: "contacts", component: ContactsComponent },
      { path: "contacts/contact-add-new", component: ContactAddNewComponent },
      { path: "contacts/:id", component: ContactDetailsComponent }
    ])
  ]
})
export class ContactsModule { }
