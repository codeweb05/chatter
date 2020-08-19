import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService {
  private BASE_URL = environment.apiUrl + '/user';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getChat() {
    return this.http.get(`${this.BASE_URL}/chat`, this.httpOptions).pipe(
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
