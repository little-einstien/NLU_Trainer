import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as M from 'materialize-css';
import * as _ from 'lodash';
import { QueryList } from '@angular/core';
import { Intent } from '../../models/intent';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.css']
})
export class IntentListComponent implements OnInit {
  intents:Array<Intent> = [];
  intent = "";
  project = "";

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute,private spinner : NgxSpinnerService) {
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params.projectid) {
        this.project = params.projectid;
        this.initializeIntentList();
      }
    });
  }
  ngOnInit() {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  }
  initializeIntentList() {
    if (!this.project) {
      console.log("No project selected");
      this.spinner.hide();
      return;
    }
    return this.dataHandlerService.getIntentList(this.project).then((intents: Array<Intent>) => {
      this.intents = intents;
      this.spinner.hide();
      return intents;
    });
  }
  
  deleteIntent(i) {
    let intents = this.intents;
    let blockRef = this;
    this.dataHandlerService.deleteIntent(this.project, this.intents[i].intent).then(function (data) {
      if (data == "1") {
        blockRef.dataHandlerService.showAlert('Intent Deleted Succesfully');
        _.remove(intents, function (n, j) {
          return i == j;
        });
      }
    });

  }
}
