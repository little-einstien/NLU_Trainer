import { Component } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';
import { ActivatedRoute } from "@angular/router";
import { DataHandlerService } from './services/data-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: Message;
  public messages: Message[];
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
            
            this.message = new Message('', 'assets/images/user.png', 'user', new Date());
            debugger;
            this.messages = [
              new Message(this.getCardWithButtons(this.flow.nodes[startingNode].label, this.getChildren(startingNode,this.flow.edges)), 'assets/images/bot.png', 'bot', new Date())
            ];
          } else {
            this.message = new Message('', 'assets/images/user.png', 'user', new Date());
            this.messages = [
              new Message('Welcome i am your assitant', 'assets/images/bot.png', 'bot', new Date())
            ];
          }
        });
        this.botint = true;
      }
    });
  }
  public getResponse() {
    alert();
  }
  getChildren(parent,data){
    let to = [];
    for (let _i = 0; _i < data.length; _i++) {
      if(data[_i].from == parent){
        to.push({id : data[_i] ,  txt : this.flow.nodes[data[_i].to].btn_txt} );
      }
    }
    return to;
  }

  getCardWithButtons(desc, btns) {
    let html = `<div class="row">
    <div class="col s12 m6">
      <div class="card">
      <div class="card-content black-text">
        <p class="center">${desc}</p>
      <div class="card-action">
      `;
      for(let _i = 0 ; _i <  btns.length ; _i++){
        html += `<a (click) = "getResponse(${btns[_i].id})"  class=" col s12 normal-btn waves-effect waves-grey red btn" style="float:  none;" > ${btns[_i].txt}</a>`
      }
      html += `</div>
        </div>
      </div>
    </div>
  </div>`;
    return html;
  }


}
