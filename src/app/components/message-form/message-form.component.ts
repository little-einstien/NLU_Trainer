import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { DialogflowService } from '../../services/dialogflow.service'
@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  constructor(private dialogFlowService: DialogflowService) { }
  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[] = [];
  
  @Input('botinit')
  public botinit : boolean;
  

  ngOnInit() {
    console.log('BOTINIT'+ this.botinit)
  }


  public sendMessage(): void {
    if(!this.message.content || this.message.content.trim().length == 0){
      return;
    }
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.dialogFlowService.getResponse(this.message.content,this.botinit).then((res:any) => {
      console.log(res['res']);
      this.messages.push(
        // new Message(res['res'][0]  , 'assets/images/bot.png', 'bot',new Date(),JSON.stringify(res, null, 2))
        new Message(res['res'][0]  , 'assets/images/bot.png', 'bot',new Date(),res)
      );
    });
    this.message = new Message('', 'assets/images/user.png','user');
}
onKeydown(event) {
  if (event.key === "Enter") {
    this.sendMessage();
    console.log(event);
  }
}

}
