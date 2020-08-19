import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrgRegisterComponent } from './org-register.component';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderModule } from '../../shared/components/header/header.module';

const routes: Routes = [
  {
    path: '**',
    component: OrgRegisterComponent,
  },
];

@NgModule({
  declarations: [OrgRegisterComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OrgRegisterModule {}
