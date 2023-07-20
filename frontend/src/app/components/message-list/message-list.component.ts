import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-message-list',
  template: `
    <div class="message-list" #messageList>
      <div class="message" *ngFor="let message of messages">
        <div class="sender">{{ message.senderName }}<small> sent at {{message.date}}</small>
      </div>
      <app-report-form *ngIf="(myself.username !== message.senderName)" class = "report-on-hover" [message]="message"></app-report-form>
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
    .report-on-hover {
      display: none;
    }
    .message:hover .report-on-hover{
      display:block;
    }
    `
  ]
})
export class MessageListComponent implements OnChanges, OnInit{
  constructor(private api:ApiService,private router:Router){

  }
  ngOnInit(): void {
    this.api.getMe().subscribe((next)=>{
      this.myself = next;
    },
    (error)=>{
      this.router.navigate(['/']);
    });
  }
  @Input() messages: any[] = [];
  myself:any;
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
