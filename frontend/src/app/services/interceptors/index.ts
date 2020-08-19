import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor.service';
import { JwtInterceptor } from './jwt-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
