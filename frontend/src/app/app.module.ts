import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { UserRegisterModule } from './modules/user-register/user-register.module';
import { OrgRegisterModule } from './modules/org-register/org-register.module';
import { AppRoutingModule } from './app-routing.module';
import { AlertPopupModule } from './services/popups/alert-popup/alert-popup.module';

import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './services/interceptors';
import { HttpErrorService } from './services/http-error/http-error.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AlertPopupModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    NgbModule,
    HttpClientModule,
    LoginModule,
    UserRegisterModule,
    OrgRegisterModule,
  ],
  providers: [httpInterceptorProviders, HttpErrorService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
