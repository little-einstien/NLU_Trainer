import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
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
  public pno: number = 1;
  public totalIntents: number = 0;
  public maxRecords: number = 10;
  public pages: Array<number> = []
  public intents: Array<Intent> = [];
  public intent = "";
  public project;

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute, 
    private spinner: NgxSpinnerService, private router: Router) {
  }
  ngOnInit() {
    this.spinner.show();
        this.dataHandlerService.currentProject.subscribe(project => this.project = project);
        this.initializeIntentList(this.pno);
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  }

  initializeIntentList(pageno) {
    if (pageno < 1 || (this.pages.length != 0 && pageno > this.pages.length)) {
      this.spinner.hide();
      return;
    }
    if (!this.project.id) {
      console.log("No project selected");
      this.router.navigate(['/']);
      this.spinner.hide();
      return;
    }
    this.pno = pageno;
    return this.dataHandlerService.getIntentList(this.project.id, this.pno).then(result => {
      this.intents = result['data'];
      if (this.pno == 1 && result['count']) {
        this.totalIntents = result['count'];
        this.pages = _.range(this.pno, this.totalIntents / this.maxRecords + 1);
      } else if (this.intents.length == 0) {
        this.spinner.hide();
        this.totalIntents = 0;
      }
      this.spinner.hide();
      return result;
    });
  }
  ngAfterViewInit() {
    this.ilist.changes.subscribe(t => {
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
  editIntent(intent) {
    this.dataHandlerService.changeIntent(intent);
    this.router.navigate(['/ine']);
  }
}
