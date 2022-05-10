import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ISlide } from '../slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private readonly apiURL = "http://localhost:3000/slider";

  constructor(private http: HttpClient) { }

  slides$ = <Observable<ISlide[]>>this.http.get<ISlide[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: FormData) => <Observable<ISlide>>this.http.post<ISlide>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  getByName$ = (name: string) => <Observable<ISlide>>this.http.get<ISlide>(`${this.apiURL}/${name}`)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<ISlide>>this.http.delete<ISlide>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
