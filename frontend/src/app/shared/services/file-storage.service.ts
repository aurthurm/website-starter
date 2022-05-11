import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { BACKEND_API_URL } from 'src/constants';


@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private readonly apiURL = BACKEND_API_URL + "/file-storage";

  constructor(private http: HttpClient) { }

  delete$ = (filepath: string) => <Observable<any>>this.http.delete<any>(`${this.apiURL}?filepath=${filepath}`)
  .pipe(
    catchError(this.handleError)
  )  
  
  private handleError(error: HttpErrorResponse):Observable<never> {
    console.log(error)
    throw new Error('Error ' + error.message);
  }
}
