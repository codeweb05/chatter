import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgRegisterComponent } from './org-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('OrgRegisterComponent', () => {
  let component: OrgRegisterComponent;
  let fixture: ComponentFixture<OrgRegisterComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [OrgRegisterComponent],
      providers: [AuthService],
    }).compileComponents();
    service = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.orgRegisterForm.contains('orgName')).toBeTruthy();
    expect(component.orgRegisterForm.contains('name')).toBeTruthy();
    expect(component.orgRegisterForm.contains('email')).toBeTruthy();
    expect(component.orgRegisterForm.contains('domain')).toBeTruthy();
  });
  it('should orgName is reqd', () => {
    let control = component.orgRegisterForm.get('orgName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should name is reqd', () => {
    let control = component.orgRegisterForm.get('name');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should email is reqd', () => {
    let control = component.orgRegisterForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should NOT submit the form if it is invalid', () => {
    let spy = spyOn(service, 'orgRegister').and.returnValue(of([]));

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });
  it('should submit the form and give success response', () => {
    let spy = spyOn(service, 'orgRegister').and.returnValue(of([]));

    component.orgRegisterForm.get('email').setValue('email@email.com');
    component.orgRegisterForm.get('name').setValue('name');
    component.orgRegisterForm.get('domain').setValue('domain');
    component.orgRegisterForm.get('orgName').setValue('orgName');
    component.onSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.errorMsg).toBe('');
  });
  it('should submit the form and give error response', () => {
    let err = 'err response';
    let spy = spyOn(service, 'orgRegister').and.returnValue(throwError(err));

    component.orgRegisterForm.get('email').setValue('email@email.com');
    component.orgRegisterForm.get('name').setValue('name');
    component.orgRegisterForm.get('domain').setValue('domain');
    component.orgRegisterForm.get('orgName').setValue('orgName');
    component.onSubmit();

    expect(component.errorMsg).toBe(err);
  });
  it('should fetch form controls', () => {
    let formControls = component.orgRegisterForm.controls;
    expect(component.orf).toBe(formControls);
  });
});
