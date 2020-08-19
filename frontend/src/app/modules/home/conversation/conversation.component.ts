import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { SocketService } from '../../../services/socket/socket.service';
import { ChatService } from '../../../services/chat/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public messageLoading = false;
  @Input() selectedUser = null;
  @Input() messages = [];
  @Input() loading = true;
  @Output() newMessageEmitter = new EventEmitter();
  public messageForm: FormGroup;
  @ViewChild('messageThread') private messageContainer: ElementRef;
  @ViewChild('messageInput') private messageInput: ElementRef;
  constructor(
    private socketService: SocketService,
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.messageForm = this.buildForm();
  }

  sendMessage(event) {
    if (event.keyCode === 13) {
      const message = this.messageForm.controls['message'].value.trim();
      if (!message) {
        this.messageForm.reset();
      } else if (!this.selectedUser) {
        alert(`Select a user to chat.`);
      } else {
        const messagePayload = {
          message: message.trim(),
          toUserId: this.selectedUser.userId,
        };
        this.socketService.sendMessage(messagePayload);
        this.newMessageEmitter.emit(messagePayload);
        this.messageForm.reset();
        this.messageInput.nativeElement.focus();
        this.scrollMessageContainer();
      }
    }
  }

  scrollMessageContainer(): void {
    if (this.messageContainer !== undefined) {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }, 100);
    }
  }

  buildForm() {
    return this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])],
    });
  }
}
