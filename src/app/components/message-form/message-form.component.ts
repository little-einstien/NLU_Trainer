import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service'
import { ScrollbarComponent } from 'ngx-scrollbar';
@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Input("scroll") scrollRef: ScrollbarComponent;
  constructor(private dialogFlowService: DialogflowService) { }
  @Input('message')
  private message: Message;

  @Input('messages')
  private messages: Message[] = [];

  @Input('botinit')
  public botinit: boolean;


  ngOnInit() {
    console.log('BOTINIT' + this.botinit)
  }
  public sendMessage(): void {
    if (!this.message.content || this.message.content['txt'].trim().length == 0) {
      return;
    }
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.dialogFlowService.getResponse(this.message.content['txt'], this.botinit).then((res: any) => {
      console.log(res['res']);
      this.messages.push(
        // new Message(res['res'][0]  , 'assets/images/bot.png', 'bot',new Date(),JSON.stringify(res, null, 2))
        new Message({txt: res['res'][0] ,type:1}, 'assets/images/bot.png', 'bot', new Date(), res)
      );
    });
    this.message = new Message({txt:'',type:1}, 'assets/images/user.png', 'user');
    setTimeout(() => {this.scrollRef['directiveRef'].scrollToBottom()},250);
  }
  onKeydown(event) {
    if (event.key === "Enter") {
      this.sendMessage();
      console.log(event);
    }
  }
}
