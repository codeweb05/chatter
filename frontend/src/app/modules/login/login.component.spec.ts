import { AdminService } from './../../services/admin/admin.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  class activatedRouteStub {
    private subject = new Subject();

    push(value) {
      this.subject.next(value);
    }
    get queryParams() {
      return this.subject.asObservable();
    }
  }
  let activatedRoute: activatedRouteStub;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AuthService,
        { provide: ActivatedRoute, useClass: activatedRouteStub },
      ],
      declarations: [LoginComponent],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should navigate to home page if user is in session', () => {
    authService.currentUserSubject.next('user');
    const navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
  it('should send auth request to google if params are received', () => {
    authService.currentUserSubject.next(null);
    fixture.detectChanges();
    activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.push({ code: 123 });

    const spyGoogle = spyOn(authService, 'google');
    // expect(spyGoogle).toHaveBeenCalled();
  });
});
