import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private BASE_URL = environment.apiUrl + '/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public currentUserSubject;
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  orgRegister(params) {
    return this.http
      .post(
        `${this.BASE_URL}/orgRegister`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(
        map(
          (response) => {
            return response;
          },
          (error) => {
            throw error;
          }
        )
      );
  }
  userRegister(params) {
    return this.http
      .post(
        `${this.BASE_URL}/userRegister`,
        JSON.stringify(params),
        this.httpOptions
      )
      .pipe(
        map(
          (response) => {
            return response;
          },
          (error) => {
            throw error;
          }
        )
      );
  }

  google(params) {
    const httpOptions = { ...this.httpOptions, params };
    return this.http.get(`${this.BASE_URL}/google/callback`, httpOptions).pipe(
      map(
        (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return;
        },
        (error) => {
          throw error;
        }
      )
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
