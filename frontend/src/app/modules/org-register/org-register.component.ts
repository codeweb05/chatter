import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../shared/email-validator';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-register',
  templateUrl: './org-register.component.html',
  styleUrls: ['./org-register.component.scss'],
})
export class OrgRegisterComponent implements OnInit {
  orgRegisterForm: FormGroup;
  orfSubmitted: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;
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
    this.orgRegisterForm = this.buildForm();
  }
  get orf() {
    return this.orgRegisterForm.controls;
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      orgName: ['', Validators.compose([Validators.required])],
      domain: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.valid]),
      ],
    });
  }

  onSubmit() {
    this.orfSubmitted = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;
    if (this.orgRegisterForm.valid) {
      this.authService
        .orgRegister(this.orgRegisterForm.value)
        .pipe(first())
        .subscribe(
          (response) => {
            this.orfSubmitted = false;
            this.orgRegisterForm.reset();
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
