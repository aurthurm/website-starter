import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IArticle } from '../article.model'
import { IPaginated } from 'src/app/shared/models/app-data';
import { BACKEND_API_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private readonly apiURL = BACKEND_API_URL + "/articles";

  constructor(private http: HttpClient) { }

  articles$ = (page: number, limit: number, params:any = {}) => 
  <Observable<IPaginated<IArticle>>>
  this.http.get<IPaginated<IArticle>>
  (`${this.apiURL}/paginated?&limit=${limit}&page=${page}${params.category ? '&category=' + params.category : ''}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: FormData) => <Observable<IArticle>>this.http.post<IArticle>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  getBySlug$ = (slug: string) => <Observable<IArticle>>this.http.get<IArticle>(`${this.apiURL}/slug/${slug}`)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<IArticle>>this.http.delete<IArticle>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  publish$ = (id: string) => <Observable<IArticle>>this.http.post<IArticle>(`${this.apiURL}/publish/${id}`, {})
  .pipe(
    catchError(this.handleError)
  )

  filter$ = (params: any) => <Observable<IArticle[]>>this.http.get<IArticle[]>(`${this.apiURL}/filter`, { params })
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
