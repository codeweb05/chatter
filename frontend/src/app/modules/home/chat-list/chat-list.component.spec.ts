import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatListComponent } from './chat-list.component';
import { AdminService } from '../../../services/admin/admin.service';
import { HttpErrorService } from '../../../services/http-error/http-error.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { ChatService } from '../../../services/chat/chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;
  let adminService: AdminService;
  let httpErrorService: HttpErrorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        AdminService,
        AuthService,
        SocketService,
        ChatService,
        HttpErrorService,
      ],
    }).compileComponents();
    adminService = TestBed.inject(AdminService);
    httpErrorService = TestBed.inject(HttpErrorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isUserSelected func should return false if user is not selected', () => {
    component.selectedUser = null;
    expect(component.isUserSelected('abc')).toBeFalse;
  });
  it('isUserSelected func should return false if userid not match selected', () => {
    component.selectedUser = {
      userId: 'user1',
    };
    expect(component.isUserSelected('user2')).toBeFalse;
  });
  it('isUserSelected func should return true if userid matches selected', () => {
    component.selectedUser = {
      userId: 'user1',
    };
    expect(component.isUserSelected('user1')).toBeFalse;
  });

  it('blockUser func should emit value to parent component if successful', () => {
    let spyBlockUser = spyOn(adminService, 'blockUser').and.returnValue(of([]));
    let spyBlockUserEmitter = spyOn(component.blockUserEmitter, 'emit');
    let spyHideDropDown = spyOn(component, 'hideDropDown');

    component.blockUser('user');

    expect(spyBlockUser).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
    expect(spyBlockUserEmitter).toHaveBeenCalled();
  });
  it('blockUser func should show error popup if error is thrown', () => {
    const err = 'Unable to block the user';
    let spyBlockUser = spyOn(adminService, 'blockUser').and.returnValue(
      throwError(err)
    );
    let spyHideDropDown = spyOn(component, 'hideDropDown');
    let spyShowError = spyOn(httpErrorService, 'showError');

    component.blockUser('user');

    expect(spyBlockUser).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
    expect(spyShowError).toHaveBeenCalledWith(err);
  });

  it('setAccess func should do nothing if success response is received', () => {
    let spySetAccess = spyOn(adminService, 'setAccess').and.returnValue(of([]));
    let spyHideDropDown = spyOn(component, 'hideDropDown');

    component.setAccess('user');

    expect(spySetAccess).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
  });

  it('setAccess func should show error popup if error is thrown', () => {
    const err = 'Unable to set access';
    let spySetAccess = spyOn(adminService, 'setAccess').and.returnValue(
      throwError(err)
    );
    let spyHideDropDown = spyOn(component, 'hideDropDown');
    let spyShowError = spyOn(httpErrorService, 'showError');

    component.setAccess('user');

    expect(spySetAccess).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
    expect(spyShowError).toHaveBeenCalledWith(err);
  });

  it('deleteUser func should do remove user from chatList if success response is received', () => {
    let spyDeleteUser = spyOn(adminService, 'deleteUser').and.returnValue(
      of([])
    );
    let spyHideDropDown = spyOn(component, 'hideDropDown');
    component.chatListUsers = [1, 2];

    component.deleteUser('user', 0);

    expect(spyDeleteUser).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
    expect(component.chatListUsers.length).toBe(1);
  });

  it('deleteUser func should show error popup if error is thrown', () => {
    const err = 'Unable to delete user';
    let spyDeleteUser = spyOn(adminService, 'deleteUser').and.returnValue(
      throwError(err)
    );
    let spyHideDropDown = spyOn(component, 'hideDropDown');
    let spyShowError = spyOn(httpErrorService, 'showError');

    component.deleteUser('user', 0);

    expect(spyDeleteUser).toHaveBeenCalled();
    expect(spyHideDropDown).toHaveBeenCalled();
    expect(spyShowError).toHaveBeenCalledWith(err);
  });
});
