import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IUser } from '../users.model';
import { BACKEND_API_URL } from 'src/constants';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiURL = BACKEND_API_URL + "/users";

  constructor(private http: HttpClient) { }

  users$ = <Observable<IUser[]>>this.http.get<IUser[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: IUser) => <Observable<IUser>>this.http.post<IUser>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<IUser>>this.http.delete<IUser>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
