import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderModule } from '../../shared/components/header/header.module';
import { GoogleAuthModule } from '../../shared/components/google-auth/google-auth.module';
const routes: Routes = [
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    HeaderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleAuthModule,
    RouterModule.forChild(routes),
  ],
})
export class LoginModule {}
