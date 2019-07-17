import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IContact } from './contact';
import { InewContact } from './contact-add-new/newContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = "https://localhost:44315/api/contacts";

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.contactsUrl).pipe(
      tap(data => console.log("DATA:  " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getContactbyId(id: string): Observable<IContact> {
    return this.http.get<IContact>(this.contactsUrl + "/" + id).pipe(
      tap(data => console.log("DATA:  " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postNewContact(newContact: InewContact): Observable<any> {
    return this.http.post("https://putsreq.com/mFlvs0WpkxJh0eg2cDWR", newContact).pipe(
      tap(data => console.log("DATA:  " + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}