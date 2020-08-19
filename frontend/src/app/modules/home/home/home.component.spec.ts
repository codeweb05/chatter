import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { ChatService } from '../../../services/chat/chat.service';
import { HttpErrorService } from '../../../services/http-error/http-error.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, SocketService, ChatService, HttpErrorService],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should NOT set the value of current user in ngonit if user is not logged in', () => {
    fixture.detectChanges();
    expect(component.currentUser).toBeNull();
  });
  it('should set the value of current user in ngonit if user is logged in', () => {
    authService.currentUserSubject.next('user');
    fixture.detectChanges();
    expect(component.currentUser).not.toBeNull();
  });

  it('should render the chats once received from backend', () => {
    component.chatListUsers = [];
    component.messageList = {};
    component.currentUser = {};
    component.renderChats([
      {
        name: 'name',
        isActive: true,
        isOrgAdmin: true,
        isAdmin: true,
        userId: 'user1',
        messages: [
          { fromUserId: 'user1', createdAt: Date.now() },
          { fromUserId: 'user2', createdAt: Date.now() },
        ],
      },
    ]);
    expect(component.chatListUsers.length).toBe(1);
    expect(component.messageList['user1']).toBeDefined();
  });
});
