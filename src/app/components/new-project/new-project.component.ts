import { Component, OnInit, NgZone } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  project = { nickname: '', tts: false, stt: false }
  constructor(private dataHandlerService: DataHandlerService,
     private router: Router,
    private spinner: NgxSpinnerService) { }
  ngOnInit() {

  }
  createNewProject() {
    let blockRef = this;
    this.spinner.show();
    this.dataHandlerService.isProjectExists(this.project.nickname).then(exists => {
      if (exists) {
        this.spinner.hide();
        this.dataHandlerService.showAlert('Sorry ! Project with same name allready exists');
      } else {
        this.dataHandlerService.createProject(this.project).then((result) => {
          blockRef.dataHandlerService.showAlert('Project Created Succesfully');
          blockRef.resetData();
          this.router.navigate(['/intentList/' + result]);
          this.spinner.hide();
        });
      }
    });

  }
  resetData() {
    this.project = { nickname: '', tts: false, stt: false };
  }
}
