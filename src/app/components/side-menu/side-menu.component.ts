import { Component, OnInit, Injectable, ViewChildren, QueryList } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Project } from '../../models/project';
import { NgxSpinnerService } from 'ngx-spinner';
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
  constructor(private dataHandlerService: DataHandlerService, private router: Router, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.dataHandlerService.getProjectList().then((list: Array<Project>) => {
      if(list && list.length != 0 ){ 
        this.projectList = this.projectList.concat(list);
        this.project = list[0];
        this.router.navigate(['/intentList/' + this.project.id]);
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
    this.router.navigate(['/intentList/' + this.project.id]);
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
}
