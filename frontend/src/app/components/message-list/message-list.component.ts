import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnChanges {
  @Input() messages: any[] = [];
  @ViewChild('messageList') messageList!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && changes['messages'].currentValue) {
      const totalMessages = changes['messages'].currentValue['messages'].length;
      const lastTenMessages = changes['messages'].currentValue[
        'messages'
      ].slice(totalMessages - 10 >= 0 ? totalMessages - 10 : 0);
      this.messages = lastTenMessages;
    }
  }
}
