import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UsersService } from './../user/users.service';
import { ThreadsService } from './../thread/threads.service';
import { MessagesService } from './../message/messages.service';

import { Message } from './../message/message.model';
import { Thread } from './../thread/thread.model';
import { User } from './../user/user.model';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  currentUser: User;
  incoming: boolean;
  private subscription: Subscription;

  constructor(public UsersService: UsersService) {}

  ngOnInit(): void {
    this.subscription = this.UsersService.currentUser.subscribe(
      (user: User) => {
        this.currentUser = user;
        if (this.message.author && user) {
          this.incoming = this.message.author.id !== user.id;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
