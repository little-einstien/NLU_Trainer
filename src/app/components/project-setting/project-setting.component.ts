import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.css']
})
export class ProjectSettingComponent implements OnInit {

  project = {nickname:'',tts:false,stt:false}
  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }
  ngOnInit() {
  }
  createNewProject(){
    let blockRef = this;
    this.dataHandlerService.createProject(this.project).then(()=>{
      blockRef.dataHandlerService.showAlert('Project Created Succesfully');
      blockRef.resetData();
       console.log("project created");

    });
  }
  resetData(){
    this.project = {nickname:'',tts:false,stt:false};
  }

}
