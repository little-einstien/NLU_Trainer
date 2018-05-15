import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';
@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.css']
})
export class IntentListComponent implements OnInit {

  intents = [];
  intent = "";
  constructor(private dataHandlerService: DataHandlerService) { }
  ngOnInit() {
    this.dataHandlerService.doGET().then((data:Array<any>) =>{
        this.intents = data;
        console.log(this.intents)
    });
  }
}
