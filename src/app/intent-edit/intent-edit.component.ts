import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {DataHandlerService} from '../data-handler.service';
@Component({
  selector: 'app-intent-edit',
  templateUrl: './intent-edit.component.html',
  styleUrls: ['./intent-edit.component.css']
})
export class IntentEditComponent implements OnInit {
  sample = '';
  constructor(private route: ActivatedRoute,private dataHandlerService: DataHandlerService) {
    this.route.params.subscribe( params => {
      console.log(params);this.intent = params.intent;
      this.dataHandlerService.getSample(params.intent).then((data) =>{
         this.sample = data;

      });
    });
  }

  ngOnInit() {
  }
  samples : Array<{intent: string, text: string,res: string}> = [];
  myControl: FormControl = new FormControl();

  text : string;
  response : string;
  intent:string;
  options = [
    'greet',
    'buy',
    'anger'
   ];
   texts = [
     'greet',
     'buy',
     'anger'
    ];
    responses = [
      'greet',
      'buy',
      'anger'
     ];

  addChild(){
    this.samples.push({intent: "intent", text: "This is the sample text",res:"Response"});
    console.log(this.samples);
    if(this.samples[this.samples.length-1].intent && this.options.indexOf(this.samples[this.samples.length-1].intent)<=-1){
      this.options.push(this.samples[this.samples.length-1].intent);
    }
    console.log(this.options);
  }

  addText(){
    if(this.text){
      this.texts.push(this.text);
      this.text = "";
    }
  }
  addResponse(){
    if(this.response){
    this.responses.push(this.response);
    this.response = "";
  }


  }

}
