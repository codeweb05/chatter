import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpErrorService } from '../http-error/http-error.service';

@Injectable()
export class SocketService {
  private BASE_URL = environment.socketUrl;
  private socket;

  constructor(
    private authService: AuthService,
    private httpErrorService: HttpErrorService
  ) {
    const token =
      this.authService.currentUserValue &&
      this.authService.currentUserValue.access.token;
    this.socket = io(this.BASE_URL, { query: `token=${token}` });
    // this.socket.on('disconnect', () => {
    //   this.httpErrorService.showError('Unable to connect to chat server');
    // });
  }

  logout() {
    this.socket.disconnect();
  }

  sendMessage(message): void {
    this.socket.emit('add-message', message);
  }

  receiveMessages() {
    return new Observable((observer) => {
      this.socket.on('add-message-response', (data) => {
        observer.next(data);
      });
    });
  }
}
