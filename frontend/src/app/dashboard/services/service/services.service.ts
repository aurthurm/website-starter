import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BACKEND_API_URL } from 'src/constants';
import { IService } from '../services.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private readonly apiURL = BACKEND_API_URL + "/services";

  constructor(private http: HttpClient) { }

  services$ = <Observable<IService[]>>this.http.get<IService[]>(`${this.apiURL}`)
  .pipe(
    catchError(this.handleError)
  )

  save$ = (data: IService) => <Observable<IService>>this.http.post<IService>(`${this.apiURL}`, data)
  .pipe(
    catchError(this.handleError)
  )

  getByName$ = (name: string) => <Observable<IService>>this.http.get<IService>(`${this.apiURL}/${name}`)
  .pipe(
    catchError(this.handleError)
  )

  delete$ = (id: string) => <Observable<IService>>this.http.delete<IService>(`${this.apiURL}/${id}`)
  .pipe(
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse):Observable<never> {
    throw new Error('Method not implemented.');
  }
}
