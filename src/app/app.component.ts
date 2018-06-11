import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';
import { ActivatedRoute } from "@angular/router";
import { DataHandlerService } from './services/data-handler.service';
import { ScrollbarComponent } from 'ngx-scrollbar';
import { PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  public type: string = 'component';
  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  public message: Message = new Message({txt:'',type:1}, 'assets/images/user.png', 'user', new Date());;
  
  public messages: Message[] = [
    new Message({txt: 'Welcome i am your assitant',type:1}, 'assets/images/bot.png', 'bot', new Date())
  ];
  public botint: boolean;
  public flow;
  constructor(private route: ActivatedRoute, private dialogflowService: DialogflowService, private dataService: DataHandlerService) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.project) {
        this.dialogflowService.project = params.project;
        this.dataService.getFlow(params.project).then((flow) => {
          this.flow = flow['flow'];
          if (flow['sp']) {
            let startingNode = flow['sp'];        
            this.message = new Message({txt:''}, 'assets/images/user.png', 'user', new Date());
            debugger;
            
            this.messages = [ 
              new Message({txt : this.flow.nodes[startingNode].label,type:2,children : this.getChildren(startingNode,this.flow.edges)}, 'assets/images/bot.png', 'bot', new Date())
            ];
          }
        });
        this.botint = true;
      }
    });
  }
  
  getChildren(parent,data){
    let to = [];
    for (let _i = 0; _i < data.length; _i++) {
      if(data[_i].from == parent){
        to.push(this.flow.nodes[data[_i].to]);
      }
    }
    return to;
  }
  getResponse($event){
    let txt = this.flow.nodes[$event].label;
    let children  =  this.getChildren($event,this.flow.edges);
    let type = children && children.length != 0 ? 2 : 1;
    this.messages.push( 
      new Message({txt : txt,type:type,children:children}, 'assets/images/bot.png', 'bot', new Date())
    );
    setTimeout(() => { this.scrollToBottom()},250);
    console.log($event);
  }
  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }
}
