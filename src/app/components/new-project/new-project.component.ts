import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  project = {nickname:'',tts:false,stt:false}
  constructor(private dataHandlerService: DataHandlerService,private spinner : NgxSpinnerService) { }
  ngOnInit() {
  }
  createNewProject(){
    let blockRef = this;
    this.spinner.show();
    this.dataHandlerService.isProjectExists(this.project.nickname).then(exists =>{
      if(exists){
        this.spinner.hide();
        this.dataHandlerService.showAlert('Sorry ! Project with same name allready exists');
      }else{
        this.dataHandlerService.saveProject(this.project).then(()=>{
          blockRef.dataHandlerService.showAlert('Project Created Succesfully');
          blockRef.resetData();
          console.log("project created");this.dataHandlerService.showAlert('Project created');
        });
      }
    });
    
  }
  resetData(){
    this.project = {nickname:'',tts:false,stt:false};
  }
}
