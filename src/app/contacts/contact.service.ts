import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { IContact } from './data/contact';
import { InewContact } from './data/newContact';

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
    return this.http.post(this.contactsUrl, newContact, { responseType: 'text' }).pipe(
      tap(data => console.log("DATA:  " + JSON.stringify(data))),
      catchError(this.handleError));
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(this.contactsUrl + "/" + id).pipe(
      tap(data => console.log("DATA:  " + JSON.stringify(data))),
      catchError(this.handleError));;
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