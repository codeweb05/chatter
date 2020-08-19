import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { ChatService } from '../../../services/chat/chat.service';
import { first } from 'rxjs/operators';
import { HttpErrorService } from '../../../services/http-error/http-error.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chatListUsers = [];
  messageList = {};
  selectedUser = null;
  currentUser = null;
  selectedMessage = [];
  loading = true;
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private httpErrorService: HttpErrorService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.currentUser = this.authService.currentUserValue;
    }
    this.chatService
      .getChat()
      .pipe(first())
      .subscribe(
        (data) => {
          this.renderChats(data);
          this.listenForMessages();
        },
        (error) => {
          this.loading = false;
          this.httpErrorService.showError('Unable to fetch chats');
        }
      );
  }
  renderChats(items) {
    items.forEach((item) => {
      this.chatListUsers.push({
        name: item.name,
        isActive: item.isActive,
        isOrgAdmin: item.isOrgAdmin,
        isAdmin: item.isAdmin,
        userId: item.userId,
      });
      this.messageList[item.userId] = item.messages
        .map((message) => {
          return {
            ...message,
            alignRight: this.currentUser.userId === message.fromUserId,
          };
        })
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    });
    if (this.chatListUsers && this.chatListUsers.length) {
      this.selectedUser = this.chatListUsers[0];
      this.selectedMessage = this.messageList[this.selectedUser['userId']];
    }
    this.loading = false;
  }
  logout() {
    this.socketService.logout();
    this.authService.logout();
  }
  updateMessage(e) {
    if (!this.messageList[e.toUserId]) this.messageList[e.toUserId] = [];
    this.messageList[e.toUserId].push({ ...e, alignRight: true });
    this.selectedMessage = this.messageList[e.toUserId];
  }
  updateSelectedUser(e) {
    this.selectedUser = e;
    this.selectedMessage = this.messageList[e.userId];
  }
  updateChatUser(e) {
    const index = this.chatListUsers.findIndex(
      (user) => user.userId === e.userId
    );
    this.chatListUsers[index].isActive = e.isActive;
    this.chatListUsers = [...this.chatListUsers];
    if (this.selectedUser.userId === e.userId) {
      this.selectedUser.isActive = e.isActive;
      this.selectedUser = { ...this.selectedUser };
    }
  }
  listenForMessages(): void {
    this.socketService.receiveMessages().subscribe((data) => {
      if (data['error']) {
        this.messageList[data['toUserId']].push({
          message: data['message'],
          fromUserId: data['toUserId'],
          alignRight: false,
        });
        this.updateChatUser({
          userId: data['toUserId'],
          isActive: false,
        });
      } else {
        this.messageList[data['fromUserId']].push({
          ...(data as {}),
          alignRight: false,
        });
        if (data['fromUserId'] === this.selectedUser['userId']) {
          this.selectedMessage = this.messageList[data['fromUserId']];
        }
      }
    });
  }
}
