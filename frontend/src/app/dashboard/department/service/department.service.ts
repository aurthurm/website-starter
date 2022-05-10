import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IDepartment } from '../department.model'
import { IPaginated } from 'src/app/shared/models/app-data';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly apiURL = "http://localhost:3000/departments";

  constructor(private http: HttpClient) { }

  departments$ = <Observable<IDepartment[]>>this.http.get<IDepartment[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: IDepartment) => <Observable<IDepartment>>this.http.post<IDepartment>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  getByName$ = (name: string) => <Observable<IDepartment>>this.http.get<IDepartment>(`${this.apiURL}/${name}`)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<IDepartment>>this.http.delete<IDepartment>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  filter$ = (query: string, data: IDepartment[]) => <Observable<IDepartment[]>>
  new Observable<IDepartment[]>(
    subscriber => {
      subscriber.next(
        data.filter(item => item.title?.toLowerCase().includes(query.toLowerCase()))
      )
    }
  )
  .pipe(
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
