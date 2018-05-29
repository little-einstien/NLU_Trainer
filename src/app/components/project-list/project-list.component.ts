import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as M from 'materialize-css';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }
  projectList : Array<any>;
  ngOnInit() {
      M.FormSelect.init(document.querySelectorAll('select'), {});
      M.Modal.init(document.querySelectorAll('.modal'), {dismissible:false});
      M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),{});
    return this.dataHandlerService.getProjectList().then((list:Array<any>)=>{
      console.log(list);
      this.projectList = list;
      // return this.dataHandlerService.getIntentList(list[0].id).then((intents:Array<any>) =>{
      //     console.log(intents);
      //     this.intents = intents;

      //     return intents;
      // });
    });
  }

}
