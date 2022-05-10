import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiURL = "http://localhost:3000/app";
  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  authenticate$ = (data: FormData) => <Observable<any>>this.http.post<any>(`${this.apiURL}/auth/login`, data)
  .pipe(
    catchError(this.handleError)
  )

  getAuthStatus(): boolean {
    let auth = localStorage.getItem('__nmrl_acc__');
    if(auth) {
      return true
    }
    return false;
  }

  async getAuthUser() {
    let auth: any = await localStorage.getItem('__nmrl_acc__');
    if(auth) {
      return JSON.parse(auth)
    }
    return undefined;
  }

  logout() {
    localStorage.removeItem('__nmrl_acc__');
    this.router.navigate(['/']);
  }

  private handleError(error: HttpErrorResponse):Observable<never> {
    localStorage.removeItem('__nmrl_acc__');
    throw new Error('Method not implemented.');
  }
}
