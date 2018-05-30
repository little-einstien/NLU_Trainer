import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Message } from '../../models/message';
import * as M from 'materialize-css';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }
  @Input('message')
  private message: Message;
  constructor(){
    
  }
  
  ngOnInit() {}
}
