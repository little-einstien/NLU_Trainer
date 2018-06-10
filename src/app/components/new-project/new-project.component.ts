import { Component, OnInit, NgZone } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { Project } from '../../models/project';
@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  project = new Project('', 1, '');
  constructor(private dataHandlerService: DataHandlerService,
    private router: Router,
    private spinner: NgxSpinnerService) { }
  ngOnInit() {

  }
  createNewProject() {
    let blockRef = this;
    this.spinner.show();

    this.dataHandlerService.isProjectExists(this.project.name).then(exists => {
      if (exists) {
        this.spinner.hide();
        this.dataHandlerService.showAlert('Sorry ! Project with same name allready exists');
      } else {
        this.dataHandlerService.createProject(this.project).then((result: Project) => {

          if (!result) {
            blockRef.dataHandlerService.showAlert('Project Creatio failed');
          }

          blockRef.dataHandlerService.showAlert('Project Created Succesfully');
          blockRef.resetData();
          this.dataHandlerService.changeProject(result);
          this.router.navigate(['/inl']);
          this.spinner.hide();
        });
      }
    });
  }
  resetData() {
    this.project = new Project('', 1, '');
  }
}
