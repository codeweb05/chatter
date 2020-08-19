import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversationComponent } from './conversation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { ChatService } from '../../../services/chat/chat.service';
import { HttpErrorService } from '../../../services/http-error/http-error.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ConversationComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConversationComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [AuthService, SocketService, ChatService, HttpErrorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.messageForm.contains('message')).toBeTruthy();
  });
  it('should orgName is reqd', () => {
    let control = component.messageForm.get('message');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('sendMessage func should reset message form if empty string is found', () => {
    component.messageForm.controls['message'].setValue('    ');

    component.sendMessage({ keyCode: 13 });

    expect(component.messageForm.pristine).toBeTruthy();
  });
  it('sendMessage func should do nothing if enter is not pressed', () => {
    expect(component.sendMessage({ keyCode: 68 })).toBeUndefined();
  });

  // it('sendMessage func should raise alert if no user selected', () => {
  //   component.messageForm.controls['message'].setValue('abc');
  //   component.selectedUser = null;
  //   component.sendMessage({ keyCode: 13 });
  //   let spy = spyOn(window, 'alert');
  //   expect(spy).toHaveBeenCalled();
  // });
});
