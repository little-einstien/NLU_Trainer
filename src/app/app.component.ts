import { Component } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message : Message;
  public messages : Message[];


  constructor(private route: ActivatedRoute,private dialogflowService: DialogflowService) {
    this.route.params.subscribe( params => {
      console.log(params);
      if(params.project){
        this.dialogflowService.project = params.project;
      }
    });
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];
  }
}
