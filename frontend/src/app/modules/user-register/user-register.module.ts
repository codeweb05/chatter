import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../../shared/components/header/header.module';
import { GoogleAuthModule } from '../../shared/components/google-auth/google-auth.module';

import { UserRegisterComponent } from './user-register.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

const routes: Routes = [
  {
    path: '**',
    component: UserRegisterComponent,
  },
];

@NgModule({
  declarations: [UserRegisterComponent],
  providers: [AuthService],
  imports: [
    GoogleAuthModule,
    HeaderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UserRegisterModule {}
