import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ContactsListComponent } from './ContactsList/contactsList.component';
import { ContactDetailsComponent } from './ContactsList/contact-details/contact-details.component';
import { ContactAddNewComponent } from './ContactsList/contact-add-new/contact-add-new.component'

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactDetailsComponent,
    ContactAddNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: "ContactsList", component: ContactsListComponent },
      { path: "ContactsList/contact-add-new", component: ContactAddNewComponent },
      { path: "ContactsList/:id", component: ContactDetailsComponent },
      { path: "", redirectTo: "ContactsList", pathMatch: "full" },
      { path: "**", redirectTo: "ContactsList", pathMatch: "full" }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
