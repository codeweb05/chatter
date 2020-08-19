import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { AuthService } from '../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SocketService, AuthService],
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
