import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {AfterViewInit} from "@angular/core/src/metadata/lifecycle_hooks";
import {DataHandlerService} from '../data-handler.service';
import * as M from 'materialize-css';
@Component({
  selector: 'app-intent-edit',
  templateUrl: './intent-edit.component.html',
  styleUrls: ['./intent-edit.component.css']
})
export class IntentEditComponent implements OnInit ,AfterViewInit{
  sample  = {};
  constructor(private route: ActivatedRoute,private dataHandlerService: DataHandlerService) {
    this.route.params.subscribe( params => {
      console.log(params);
      this.intent = params.intent;
      this.dataHandlerService.getIntentDetails(params.intent).then((data) =>{
         for(var i in data){
           this.texts.push(data[i]['text']);
           this.responses.push(data[i]['response']);
         }
         //console.log(this.texts);
      });
    });
  }
  ngOnInit() {}
  ngAfterViewInit() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
  }
  samples : Array<{intent: string, text: string,res: string}> = [];
  myControl: FormControl = new FormControl();

  text : string;
  response : string;
  intent:string;
  options = [];
  texts = [];
  responses = [];

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
