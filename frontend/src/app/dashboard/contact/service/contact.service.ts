import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IPaginated } from 'src/app/shared/models/app-data';
import { IContact } from '../contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiURL = "http://localhost:3000/contact";

  constructor(private http: HttpClient) { }

  contacts$ = (page: number, limit: number) => <Observable<IPaginated<IContact>>>this.http.get<IPaginated<IContact>>(`${this.apiURL}/paginated?&limit=${limit}&page=${page}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: IContact) => <Observable<IContact>>this.http.post<IContact>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  get$ = (id: string) => <Observable<IContact>>this.http.get<IContact>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  read$ = (id: string) => <Observable<IContact>>this.http.post<IContact>(`${this.apiURL}/read/${id}`, {})
  .pipe(
    catchError(this.handleError)
  )

  filter$ = (params: any) => <Observable<IContact[]>>this.http.get<IContact[]>(`${this.apiURL}/filter`, { params })
  .pipe(
    catchError(this.handleError)
  )

  removeFeaturedImage$ = (id: string, filepath: string) => <Observable<any>>this.http.delete<any>(`${this.apiURL}/featured-image/${id}?filepath=${filepath}`)
  .pipe(
    catchError(this.handleError)
  )  


  
  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
