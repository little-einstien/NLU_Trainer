import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-intent-edit',
  templateUrl: './intent-edit.component.html',
  styleUrls: ['./intent-edit.component.css']
})
export class IntentEditComponent implements OnInit, AfterViewInit {
  @ViewChildren('texts') tlist: QueryList<any>;
  @ViewChildren('responses') rlist: QueryList<any>;
  sample = {};
  sampresponses = {};
  samples: Array<{ intent: string, text: string, res: string }> = [];
  myControl: FormControl = new FormControl();

  text: string;
  response: string;
  intent: string;
  intentOld: string;
  options = [];
  texts = [];
  responses = [];
  highlightedText = "";
  entityName = "";
  entityValue = "";
  pid = '';
  show = false;
  constructor(private route: ActivatedRoute, private dataHandlerService: DataHandlerService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.dataHandlerService.currentProject.subscribe(project => this.pid = project.id);
    if (this.pid && this.pid != '-1') {
      this.dataHandlerService.currentIntent.subscribe(intent => this.intent = intent);
      this.intentOld = this.intent;
      this.dataHandlerService.getIntentDetails(this.pid, this.intent).then((data) => {
        this.texts = data['text'];
        this.responses = data['response'];
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
    }

  }
  ngForRendered() {
    M.FormSelect.init(document.querySelectorAll('select'), {});
  }
  saveIntent() {
    debugger;
    this.filterText(this.texts).then((_texts: Array<any>) => {
      this.dataHandlerService.saveIntent({ "proj_id": this.pid, "old_intent": this.intentOld, "updated_intent": this.intent, "texts": _texts, "responses": this.responses });
      this.intentOld = this.intent;
      this.dataHandlerService.showAlert('Intent Saved Succefully');
    })
  }
  filterText(texts) {
    var _texts = [];
    return new Promise(function (resolve, reject) {
      if (!texts || texts.length == 0) {
        resolve(_texts);
      } else {
        for (let i = 0; i < texts.length; i++) {
          _texts.push({ value: texts[i].value, entities: texts[i].entities })
          if (i == texts.length - 1) {
            resolve(_texts);
          }
        }
      }
    });
  }

  ngOnInit() { }
  ngAfterViewInit() {
    this.tlist.changes.subscribe(t => {
      this.spinner.hide();
    });
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});

  }



  addChild() {
    this.samples.push({ intent: "intent", text: "This is the sample text", res: "Response" });
    console.log(this.samples);
    if (this.samples[this.samples.length - 1].intent && this.options.indexOf(this.samples[this.samples.length - 1].intent) <= -1) {
      this.options.push(this.samples[this.samples.length - 1].intent);
    }
    console.log(this.options);
  }

  addText() {
    if (this.text) {
      this.texts.push({ "value": this.text, "entities": [] });
      this.text = "";
    }
  }
  addResponse() {
    if (this.response) {
      this.responses.push(this.response);
      this.response = "";
    }
  }
  editTxt(txt, i) {
    if (this.text) {
      this.texts.push(this.text);
    }
    _.remove(this.texts, function (n, k) {
      return k == i;
    });
    // /this.texts.splice( this.texts.indexOf(txt), 1 );
    this.text = txt;
  }
  editResp(txt, i) {
    if (this.response) {
      this.responses.push(this.response);
    }
    _.remove(this.responses, function (n, k) {
      return k == i;
    });
    this.response = txt;
  }
  test() {
    console.log("TEST");
  }
  saveEntity(i, j) {
  }
  showEntityPopup(i) {
    if (this.texts[i].highlightedText) {
      let txt = this.texts[i].highlightedText;
      let htl = txt.length;
      let start = this.texts[i].value.indexOf(txt);
      let end = this.texts[i].value.indexOf(txt) + htl;

      this.texts[i]['highlightedText'] = txt;
      this.texts[i].entities.push({ 'start': start, 'end': end });
      console.log("Entity Added");;
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, {});
    }
  }
  setHighlightedText(i) {
    if (window.getSelection().toString()) {
      this.texts[i].highlightedText = window.getSelection().toString();
      this.texts[i].show = true;
    }
  }
  deleteEntity(i, j) {
    console.log(i);
    console.log(j);
    _.remove(this.texts[i].entities, function (n, k) {
      return k == j;
    });
    if (this.texts[i].entities.length == 0) {
      this.texts[i].highlightedText = null;
    }
  }
  setHighlightedTextFromInput() {

  }
}
