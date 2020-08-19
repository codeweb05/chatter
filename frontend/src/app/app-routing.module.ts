import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './modules/home/home.module#HomeModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: 'org-register',
    loadChildren:
      './modules/org-register/org-register.module#OrgRegisterModule',
  },
  {
    path: 'user-register',
    loadChildren:
      './modules/user-register/user-register.module#UserRegisterModule',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
