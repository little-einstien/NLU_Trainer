import { Component, OnInit, Injectable, ViewChildren, QueryList, NgZone } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Project } from '../../models/project';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  project: Project = new Project("Create Project", 1, '-1');
  projectList: Array<Project> = [this.project];
  @ViewChildren('plist') list: QueryList<any>;
  constructor(private dataHandlerService: DataHandlerService, private router: Router, 
    private spinner: NgxSpinnerService,private zone:NgZone,private speech : SpeechService) {
    this.spinner.show();
    this.dataHandlerService.getProjectList().then((list: Array<Project>) => {
      if(list && list.length != 0 ){ 
        this.projectList = this.projectList.concat(list);
        this.project = list[0];
        console.log("init");
        this.zone.run( () => this.router.navigate(['/intentList/' + this.project.id]));
        M.FormSelect.init(document.querySelectorAll('select'), {});
        this.spinner.hide();
      }else{
          this.spinner.hide();
          M.FormSelect.init(document.querySelectorAll('select'),{});
      }
    });
  }

  ngAfterViewInit() {
    M.Modal.init(document.querySelectorAll('.modal'), {});
    this.list.changes.subscribe(t => {
      this.ngForRendered();
    })
  }
  ngForRendered() {
    M.FormSelect.init(document.querySelectorAll('select'),{});
  }
  ngOnInit() { }
  projectChange() {
    if (this.project.id == "-1") {
      this.router.navigate(['/newproj']);
      return;
    }
    //M.FormSelect.init(document.querySelectorAll('select'),{});
    this.zone.run( () => this.router.navigate(['/intentList/' + this.project.id]));
  }
  projectSetting(){
    if (this.project.id == "-1") {
      this.dataHandlerService.showAlert('Please select the project');
      return;
    }else{
      this.router.navigate(['/settings/'+this.project.id]);      
    }
  }


  trainModel() {
    let blockRef = this;
    this.dataHandlerService.showAlert('Training Started');
    this.dataHandlerService.trainModel(this.project.id).then(function (data) {
      blockRef.dataHandlerService.showAlert('Training Completed');
    }).catch(function (err) {
      console.log("Training Failed !");
      blockRef.dataHandlerService.showAlert('Training Failed');
    });
  }
  listen(){
    this.speech.listen();
  }
}
