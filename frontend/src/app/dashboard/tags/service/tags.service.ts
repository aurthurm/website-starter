import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { ITag } from '../tag.model';
import { BACKEND_API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly apiURL = BACKEND_API_URL + "/divisions/tags";

  constructor(private http: HttpClient) { }

  tags$ = <Observable<ITag[]>>this.http.get<ITag[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: any) => <Observable<ITag>>this.http.post<ITag>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<ITag>>this.http.delete<ITag>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )  
  
  filter$ = (query: string, data: ITag[]) => <Observable<ITag[]>>
  new Observable<ITag[]>(
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
    console.log(error)
    throw new Error('Error ' + error.message);
  }
}
