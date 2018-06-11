import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/message';



@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input('message')
  private message: Message;
  @Output() responseClick: EventEmitter<any> = new EventEmitter();
  constructor(){
    
  }
  getResponse(id){
    this.responseClick.emit(id);
  }
  ngOnInit() {}
  
}
