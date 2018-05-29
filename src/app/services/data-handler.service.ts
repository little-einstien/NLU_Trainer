import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Intent } from '../models/intent';
import * as M from 'materialize-css';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private subject = new Subject<any>();
 
  apiRoot: string = "http://localhost:3000";
  projectList:Array<Project>;
  intents:Array<Intent>;
  project;
  constructor(private http: HttpClient) {
  }
  getIntentList(project) {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getintents/' + project;
      this.http.get(url).subscribe((res:Array<Intent>) => {
        this.intents = res;
        resolve(this.intents);
      });
    });
  }
  getProjectList() {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getprojects';
      this.http.get(url).subscribe((res:Array<Project>) => {
        if (res.length != 0) {
          this.project = res[0].id;
          this.projectList = res;
        }else{
          console.log("No projects found !");
        }
        resolve(this.projectList);
      });
    });
  }
  getIntentDetails(projectid,intent) {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getintentdetails/'+projectid+'/'+intent;
      this.http.get(url).subscribe(res => {
        resolve(res);
      });
    });
  }
  saveIntent(intentDetails) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/saveintent';
      this.http.post(url, intentDetails, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  deleteIntent(projectid,intent){
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/deleteintent';
      this.http.post(url, {intent:intent,projectid:projectid}, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
    
  trainModel(projid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = 'http://localhost/train/'+projid;
      try{
      this.http.get(url).subscribe(res => {
        resolve(res);
      },error => {
        reject(error);
      });
    }catch(error){
      reject(error);
    }
    });
  }
  createProject(project) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/createproject';
      this.http.post(url, project, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
  showAlert(msg){
    M.toast({html:msg,classes:['white-text']}, 1000);
  }
  sendData(message: string) {
    this.subject.next(message);
}

clearData() {
    this.subject.next();
}

getData(): Observable<any> {
    return this.subject.asObservable();
}
}
