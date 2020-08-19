import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length) {
        this.errorMsg = '';
        this.authService
          .google(params)
          .pipe(first())
          .subscribe(
            () => this.router.navigate(['/']),
            (error) => {
              if (error.toLowerCase() === 'bad request') {
                this.router.navigate(['/']);
              } else {
                this.errorMsg = error;
              }
            }
          );
      }
    });
  }
}
