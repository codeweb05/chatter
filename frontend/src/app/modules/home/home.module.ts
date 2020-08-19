import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { SocketService } from '../../services/socket/socket.service';
import { ChatService } from '../../services/chat/chat.service';
import { AdminService } from '../../services/admin/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../../shared/components/dropdown/dropdown.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [HomeComponent, ChatListComponent, ConversationComponent],
  providers: [SocketService, ChatService, AdminService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {}
