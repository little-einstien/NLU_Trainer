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
  projid = '';
  constructor(private route: ActivatedRoute,private dataHandlerService: DataHandlerService) {
    this.route.params.subscribe( params => {
      console.log(params);
      if(params.projid){
        this.projid = params.projid;
      }
      if(params.intent){
        this.intent = params.intent;
        this.intentOld = params.intent;
        this.dataHandlerService.getIntentDetails(this.projid,this.intent).then((data) =>{
             this.texts = data['text'];
             this.responses = data['response'];
        });
      }
    });
  }
  saveIntent(){
    this.dataHandlerService.saveIntent({"proj_id" : this.projid,"old_intent":this.intentOld,"updated_intent":this.intent,"texts":this.texts,"responses":this.responses});
  }
  ngOnInit() {}
  ngAfterViewInit() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
  }
  samples : Array<{intent: string, text: string,res: string}> = [];
  myControl: FormControl = new FormControl();

  text : string;
  response : string;
  intent:string;
  intentOld:string;
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
      this.texts.push({"value":this.text,"entities":[]});
      this.text = "";
    }
  }
  addResponse(){
    if(this.response){
    this.responses.push(this.response);
    this.response = "";
  }
  }
  editTxt(txt,i){
    if(this.text){
      this.texts.push(this.text);
    }
    this.texts.splice( this.texts.indexOf(txt), 1 );
    this.text = txt;
  }
  editResp(txt,i){
    if(this.response){
      this.responses.push(this.response);
    }
    this.responses.splice( this.responses.indexOf(txt), 1 );
    this.response = txt;
  }
  test(){
    console.log("TEST");
  }
}
