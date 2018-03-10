import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ThreadsService } from './../thread/threads.service';
import { Thread } from '../thread/thread.model';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit, OnDestroy {
  @Input() thread: Thread;
  selected = false;
  private subscription: Subscription;

  constructor(public threadsService: ThreadsService) {}

  ngOnInit(): void {
    this.subscription = this.threadsService.currentThread.subscribe(
      (currentThread: Thread) => {
        this.selected =
          currentThread && this.thread && currentThread.id === this.thread.id;
      }
    );
  }

  clicked(event: any): void {
    this.threadsService.setCurrentThread(this.thread);
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
