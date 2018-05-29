import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  project = {nickname:'',tts:false,stt:false}
  constructor(private dataHandlerService: DataHandlerService) { }
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
