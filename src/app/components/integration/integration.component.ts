import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild, Input } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit, AfterViewInit {
  projectList = [];
  highlighted: boolean = false;
  chatbotDomain = 'http://localhost:3000';
  code;
  @Input('p')
  project;

  constructor(private dataHandlerService: DataHandlerService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    
    console.log(this.project);
    //debugger;
    this.projectList = this.dataHandlerService.projectList;
    this.code = '<script type="text/javascript id = "bot-script" data-project = '+this.project.id+' src='+this.chatbotDomain+'/plugin/js/chatBotWidget.js"></script>';
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
  openIntegrationModal(){
    this.dataHandlerService.currentProject.subscribe(project => this.project = project)
  }
}
