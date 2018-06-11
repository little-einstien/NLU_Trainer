import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Project } from '../../models/project';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {
  public project: Project  = new Project('',1,'');
  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute,
    private spinner:NgxSpinnerService,private router:Router) {
    this.spinner.show();
    this.route.params.subscribe(params => {
      if (params.projectid) {
        console.log('project  setting initalized with' + params.projectid)
        this.project.id = params.projectid;
        this.dataHandlerService.getProjectDetails(this.project.id).then((res: Project) => {
          this.spinner.hide();
          this.project = res;
        });
      }
    });
  }
  ngOnInit() {
  }
  saveProject() {
    let blockRef = this;
    this.dataHandlerService.saveProject(this.project).then(() => {
      blockRef.dataHandlerService.showAlert('Project Saved Succesfully');
    });
  }
  delProject() {
    let blockRef = this;
    this.spinner.show();
    this.dataHandlerService.delProject(this.project).then(() => {
      this.spinner.hide();
      blockRef.dataHandlerService.showAlert('Project Deleted Succesfully');
      setTimeout(()=>{
        this.router.navigate(['']);      
      },500)
      
    });
  }
  resetData() {
    this.project = new Project('',1,'');
  }

}
