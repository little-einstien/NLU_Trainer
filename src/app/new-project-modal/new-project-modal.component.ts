import { Component, OnInit,ViewChild,
         AfterViewInit,
         ElementRef } from '@angular/core';
import {DataHandlerService} from '../data-handler.service';
import * as M from 'materialize-css';
@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent implements OnInit {
  @ViewChild('modal') newProjectModal: ElementRef;
  project = {nickname:'',tts:false,stt:false}
  constructor(private dataHandlerService: DataHandlerService) { }
  ngOnInit() {
  }
  createNewProject(){
    this.dataHandlerService.createProject(this.project).then(()=>{
        var instance = M.Modal.getInstance(document.querySelectorAll('.modal'));
        instance.close();
    });
  }
}
