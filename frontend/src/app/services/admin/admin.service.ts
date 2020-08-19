import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
@Injectable()
export class AdminService {
  private BASE_URL = environment.apiUrl + '/admin';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  blockUser(params) {
    return this.http
      .post(`${this.BASE_URL}/blockUser`, params, this.httpOptions)
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

  setAccess(params) {
    return this.http
      .post(`${this.BASE_URL}/setAccess`, params, this.httpOptions)
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

  deleteUser(userId) {
    return this.http
      .post(`${this.BASE_URL}/deleteUser`, { userId }, this.httpOptions)
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
}
