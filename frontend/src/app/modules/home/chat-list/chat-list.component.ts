import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { HttpErrorService } from '../../../services/http-error/http-error.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() chatListUsers = [];
  @Input() selectedUser = {};
  @Input() currentUser = {};
  @Output() selectedUserEmitter = new EventEmitter();
  @Output() blockUserEmitter = new EventEmitter();

  @ViewChild('dropdown', { static: false }) dropdown;
  constructor(
    private adminService: AdminService,
    private httpErrorService: HttpErrorService
  ) {}

  ngOnInit(): void {}

  isUserSelected(userId: string): boolean {
    if (!this.selectedUser) {
      return false;
    }
    return this.selectedUser['userId'] === userId ? true : false;
  }

  selectUser(user) {
    this.selectedUser = user.userId;
    this.selectedUserEmitter.emit(user);
  }
  hideDropDown() {
    this.dropdown.showDropdown = false;
  }

  blockUser(user) {
    this.hideDropDown();
    const payload = {
      userId: user.userId,
      isActive: !user.isActive,
    };

    this.adminService
      .blockUser(payload)
      .pipe(first())
      .subscribe(
        (data) => {
          this.blockUserEmitter.emit(payload);
        },
        (error) => {
          this.httpErrorService.showError('Unable to block the user');
        }
      );
  }

  setAccess(user) {
    this.hideDropDown();
    const payload = {
      userId: user.userId,
      isAdmin: !user.isAdmin,
    };
    this.adminService
      .setAccess(payload)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {
          this.httpErrorService.showError('Unable to set access');
        }
      );
  }

  deleteUser(user, index) {
    this.hideDropDown();
    this.adminService
      .deleteUser(user.userId)
      .pipe(first())
      .subscribe(
        (data) => {
          this.chatListUsers.splice(index, 1);
        },
        (error) => {
          this.httpErrorService.showError('Unable to delete user');
        }
      );
  }
}
