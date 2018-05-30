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
  @ViewChildren('intents') ilist: QueryList<any>;
  pno: number = 1;
  totalIntents: number = 0;
  maxRecords: number = 10;
  pages: Array<number> = []
  intents: Array<Intent> = [];
  intent = "";
  project = "";

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params.projectid) {
        this.project = params.projectid;
        this.initializeIntentList(this.pno);
      } else {
        this.spinner.hide();
      }
    });
  }
  ngOnInit() {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  }

  initializeIntentList(pageno) {
    if(pageno < 1 || (this.pages.length != 0 && pageno  >this.pages.length)){
      this.spinner.hide();
      return;
    }
    if (!this.project) {
      console.log("No project selected");
      this.spinner.hide();
      return;
    }
    this.spinner.show();
    this.pno = pageno;
    return this.dataHandlerService.getIntentList(this.project, this.pno).then(result => {
      this.intents = result['data'];
      if (this.pno == 1 && result['count']) {
        this.totalIntents = result['count'];
        this.pages = _.range(this.pno, this.totalIntents / this.maxRecords + 1);
      }else if (this.intents.length == 0 ){
        this.spinner.hide();
        this.totalIntents = 0;
      }
      return result;
    });
  }
  ngAfterViewInit() {
    this.ilist.changes.subscribe(t => {

      console.log(t); 
      this.spinner.hide();
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
