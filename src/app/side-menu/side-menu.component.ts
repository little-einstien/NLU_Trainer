import { Component, OnInit ,Injectable} from '@angular/core';
import { DataHandlerService } from '../data-handler.service';
import * as M from 'materialize-css';
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  projectList = [];
  project = {};
  constructor(private dataHandlerService: DataHandlerService) {
  }
  ngOnInit() {
    console.log("Side menu intialized at ----> "+ new Date().getTime());
    this.getProjectList();
  }
  showTrainingToast() {
    this.dataHandlerService.trainModel().then(function(data) {
      M.toast({ html: data, displayLength: 1000, classes: 'rounded' })
    });
  }

  ngAfterViewInit() {
    M.Modal.init(document.querySelectorAll('.modal'), {});
  }
  intializeSelect() {
    console.log("intializeSelect");
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }
  getProjectList() {
      this.projectList = this.dataHandlerService.projectList;
      this.project = this.dataHandlerService.project;
      console.log(this.project);
  }
  showSelectedProject(){
    console.log(this.project);
  }
  test(){
    console.log("Test");
  }
}
