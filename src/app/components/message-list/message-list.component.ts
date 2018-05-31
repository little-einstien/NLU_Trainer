import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Message } from '../../models/message';
import { MessageItemComponent } from '../message-item/message-item.component';
import * as M from 'materialize-css';
   
@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, AfterViewInit {
  rawresponse ;
  @Input('messages')
  private messages: Message[];

  @ViewChild('rawrespmodal', { read: ElementRef }) rawrespmodal: ElementRef;
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(MessageItemComponent, { read: ElementRef }) chatItems: QueryList<MessageItemComponent>;

  constructor() {
    console.log('Hello');
  }

  ngAfterViewInit() {
    console.log('Hello ngAfterViewInit');
    M.Modal.init(document.querySelectorAll('.modal'), {});
    this.chatItems.changes.subscribe(elements => {
       console.log('messsage list changed: ' + this.messages.length);
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log(err);
      console.log('Could not find the "chatList" element.');
    }
  }
  ngOnInit() {
  }
  openRawResponseModal(i){
    this.rawresponse = this.messages[i].rawresp;
    M.Modal.getInstance(this.rawrespmodal.nativeElement).open(); 
  }
}
