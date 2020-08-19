import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { HttpErrorService } from './http-error.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HttpErrorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    })
  );

  it('should be created', () => {
    const service: HttpErrorService = TestBed.get(HttpErrorService);
    expect(service).toBeTruthy();
  });
});
