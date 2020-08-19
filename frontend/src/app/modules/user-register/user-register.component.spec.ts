import { Observable, of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRegisterComponent } from './user-register.component';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [UserRegisterComponent],
      providers: [AuthService],
    }).compileComponents();
    service = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.userRegisterForm.contains('name')).toBeTruthy();
    expect(component.userRegisterForm.contains('email')).toBeTruthy();
  });
  it('should name is reqd', () => {
    let control = component.userRegisterForm.get('name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should email is reqd', () => {
    let control = component.userRegisterForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should NOT submit the form if it is invalid', () => {
    let spy = spyOn(service, 'userRegister').and.returnValue(of([]));

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });
  it('should submit the form and give success response', () => {
    let spy = spyOn(service, 'userRegister').and.returnValue(of([]));

    component.userRegisterForm.get('email').setValue('email@email.com');
    component.userRegisterForm.get('name').setValue('name');
    component.onSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.urfSubmitted).toBeFalsy();
  });
  it('should submit the form and give error response', () => {
    let err = 'err response';
    let spy = spyOn(service, 'userRegister').and.returnValue(throwError(err));

    component.userRegisterForm.get('email').setValue('email@email.com');
    component.userRegisterForm.get('name').setValue('name');
    component.onSubmit();

    expect(component.errorMsg).toBe(err);
  });
  it('should fetch form controls', () => {
    let formControls = component.userRegisterForm.controls;
    expect(component.urf).toBe(formControls);
  });
});
