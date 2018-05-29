import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, AfterViewInit {
  projectList = [];
  highlighted: boolean = false;
  code = ' <script type="text/javascript" src="http://localhost:3000/plugin/js/chatBotWidget.js"></script>';

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    //debugger;
    this.projectList = this.dataHandlerService.projectList;
    // M.FormSelect.init(document.querySelectorAll('select'), {});
  }
  ngAfterViewInit() {
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }
  copyToClipboard(copyText) {
    //let copyText = document.getElementById("tta");
    copyText.select();
    document.execCommand("copy");
    M.toast('I am a toast!', 1000);
  }

}
