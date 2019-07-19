import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ContactsModule } from './contacts/contacts.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ContactsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "contacts", pathMatch: "full" },
      { path: "**", redirectTo: "contacts", pathMatch: "full" }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
