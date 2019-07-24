import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "contacts", component: ContactsComponent },
      { path: "contacts/:id", component: ContactFormComponent }
    ])
  ]
})
export class ContactsModule { }
