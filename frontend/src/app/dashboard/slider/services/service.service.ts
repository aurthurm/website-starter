import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BACKEND_API_URL } from 'src/constants';
import { ISlide } from '../slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private readonly apiURL = BACKEND_API_URL + "/slider";

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
  
  removeFeaturedImage$ = (id: string, filepath: string) => <Observable<any>>this.http.delete<any>(`${this.apiURL}/featured-image/${id}?filepath=${filepath}`)
  .pipe(
    catchError(this.handleError)
  ) 

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
