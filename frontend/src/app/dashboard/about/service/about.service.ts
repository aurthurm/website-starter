import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BACKEND_API_URL } from 'src/constants';
import { IAbout } from '../about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly apiURL = BACKEND_API_URL + "/about";

  constructor(private http: HttpClient) { }

  abouts$ = <Observable<IAbout[]>>this.http.get<IAbout[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: IAbout) => <Observable<IAbout>>this.http.post<IAbout>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  getByName$ = (name: string) => <Observable<IAbout>>this.http.get<IAbout>(`${this.apiURL}/${name}`)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<IAbout>>this.http.delete<IAbout>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
