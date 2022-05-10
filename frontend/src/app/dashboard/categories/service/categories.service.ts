import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { ICategory } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly apiURL = "http://localhost:3000/divisions/categories";

  constructor(private http: HttpClient) { }

  categories$ = <Observable<ICategory[]>>this.http.get<ICategory[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: ICategory) => <Observable<ICategory>>this.http.post<ICategory>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<ICategory>>this.http.delete<ICategory>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  filter$ = (query: string, data: ICategory[]) => <Observable<ICategory[]>>
  new Observable<ICategory[]>(
    subscriber => {
      subscriber.next(
        data.filter(item => item.title?.toLowerCase().includes(query.toLowerCase()) || item.content?.toLowerCase().includes(query.toLowerCase()))
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
