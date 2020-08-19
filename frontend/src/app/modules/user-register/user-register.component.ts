import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../shared/email-validator';
import { AuthService } from '../../services/auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  urfSubmitted = false;
  errorMsg = '';
  successMsg = '';
  loading = false;
  userRegisterForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.userRegisterForm = this.buildForm();
  }
  get urf() {
    return this.userRegisterForm.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.valid]),
      ],
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    this.urfSubmitted = true;
    this.loading = true;
    if (this.userRegisterForm.valid) {
      this.authService
        .userRegister(this.userRegisterForm.value)
        .pipe(first())
        .subscribe(
          (response) => {
            this.urfSubmitted = false;
            this.userRegisterForm.reset();
            this.successMsg = response['message'];
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.errorMsg = error;
          }
        );
    }
  }
}
