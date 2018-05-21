import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as M from 'materialize-css';
@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.css']
})
export class IntentListComponent implements OnInit {
  intents = [];
  intent = "";
  projectList = [] ;
  project = "";
  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }
  ngOnInit() {
    // this.route.data
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
    M.Modal.init(document.querySelectorAll('.modal'), {dismissible:false});
    console.log("Intent list intialized at ------> " +new Date().getTime());
    return this.dataHandlerService.getProjectList().then((list:Array<any>)=>{
      console.log(list);
      if(!list){
        M.FormSelect.init(document.querySelectorAll('select'), {});
        return;
      }
      this.projectList = list;
      this.project = list[0].id;
      return this.dataHandlerService.getIntentList(list[0].id).then((intents:Array<any>) =>{
          console.log(intents);
          this.intents = intents;

          return intents;
      });
    });
  }
  projectChange(e){
    console.log("Project Changed");
    console.log(this.project);
    return this.dataHandlerService.getIntentList(this.project).then((intents:Array<any>) =>{
        console.log(intents);
        this.intents = intents;
        return intents;
    });
  }
  trainModel() {
    this.dataHandlerService.trainModel(this.project).then(function(data) {
      M.toast({ html: data, displayLength: 1000, classes: 'rounded' })
    });
  }
}
