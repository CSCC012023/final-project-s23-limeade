import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="message-list" #messageList>
      <div class="message" *ngFor="let message of messages">
        <div class="sender">{{ message.senderName }}<small> sent at {{message.date}}</small></div>
        <div class="content">{{ message.message }}</div>
      </div>
    </div>
  `,
  styles: [
    `
    .message-list {
      height: 300px;
      overflow-y: auto;
    }
    .message {
      margin-bottom: 10px;
    }
    .sender {
      font-weight: bold;
    }
    `
  ]
})
export class MessageListComponent implements OnChanges {
  @Input() messages: any[] = [];
  @ViewChild('messageList') messageList!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && changes['messages'].currentValue) {
      const totalMessages = changes['messages'].currentValue['messages'].length;
      const lastTenMessages = changes['messages'].currentValue['messages'].slice(
        totalMessages - 10 >= 0 ? totalMessages - 10 : 0
      );
      this.messages = lastTenMessages;

    }
  }
  
  
  

  private scrollToBottom() {
    this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
  }
}
