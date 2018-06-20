import { Component, OnInit, Injectable, ViewChildren, QueryList, NgZone } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import * as M from 'materialize-css';
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Project } from '../../models/project';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpeechService } from '../../services/speech.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  // @Output() projectChange: EventEmitter<any> = new EventEmitter();
  public project: Project = new Project("Create Project", 1, '-1');
  public projectList: Array<Project> = [new Project("Create Project", 1, '-1')];
  // public projectList: Array<Project> = [];
  public chatbotDomain = environment.bot_endpoint;
  public codePrefix = environment.bot_script_pf;
  public codeSuffix = environment.bot_script_sf;
  // p = '';

  @ViewChildren('plist') list: QueryList<any>;
  constructor(private dataHandlerService: DataHandlerService,
    private router: Router,
    private spinner: NgxSpinnerService, private zone: NgZone, private speech: SpeechService) { }

  ngAfterViewInit() {
    M.Modal.init(document.querySelectorAll('.modal'), {});
    M.Modal.init(document.querySelectorAll('.tooltipped'), {});
    M.Modal.init(document.querySelectorAll('.fixed-action-btn'), { direction: 'left' });
    this.list.changes.subscribe(t => {
      this.ngForRendered();
    });
  }
  ngForRendered() {
    setTimeout(() => { M.FormSelect.init(document.querySelectorAll('select'), { classes: ['_wrapper'] }) }, 250);
  }
  ngOnInit() {
    this.spinner.show();
    this.dataHandlerService.getProjectList().then((list: Array<Project>) => {
      if (list.length != 0) {
        // console.log(list);
        this.project.id = list[0].id;
        this.project.name = list[0].name;
        this.project.status = list[0].status;
        this.projectList = this.projectList.concat(list);
        //this.project = list[3];
        //M.FormSelect.init(document.querySelectorAll('select'), {})
        // this.projectList.push(this.project);
        // console.log(this.projectList)
        // this.projectList = this.projectList.concat(list);
        this.dataHandlerService.changeProject(this.project); //update project
        // this.router.navigate([`/inl`]);
      }
      this.spinner.hide();
    });
    setTimeout(() => {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {});
    }, 1000);
  }
  projectChange(i) {
    this.project = this.projectList[i];
    this.dataHandlerService.changeProject(this.project);

    if (this.project.id == "-1") {
      this.router.navigate(['/newproj']);
      return;
    } else {
      // this.router.navigate(['/inl']);
      // this.projectChange.emit();
    }
  }
  projectSetting() {
    if (this.project.id == "-1") {
      this.dataHandlerService.showAlert('Please select the project');
      return;
    } else {
      this.router.navigate(['/settings/' + this.project.id]);
    }
  }


  trainModel() {
    let blockRef = this;
    this.dataHandlerService.showAlert('Training Started');
    this.dataHandlerService.trainModel(this.project.id).then(function (data) {
      blockRef.dataHandlerService.showAlert('Training Completed');
    }).catch(function (err) {
      console.log(err);
      console.log("Training Failed !");
      blockRef.dataHandlerService.showAlert('Training Failed');
    });
  }
  listen() {
    this.speech.listen();
  }

  copyToClipboard(copyText) {
    //let copyText = document.getElementById("tta");
    copyText.select();
    document.execCommand("copy");
    M.toast('I am a toast!', 1000);
  }
}
