import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Intent } from '../models/intent';
import * as M from 'materialize-css';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
const FAILURE = "failure";
const SUCCESS = "success";


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private subject = new Subject<any>();
  apiRoot: string = "http://35.200.131.47:3000";
  //apiRoot: string = "http://localhost:3000";
  projectList: Array<Project>;
  intents: Array<Intent>;
  project;
  constructor(private http: HttpClient) {
  }
  getIntentList(project, pno) {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getintents/' + project + '/' + pno;
      this.http.get(url).subscribe(res => {
        this.intents = res['data'];
        resolve(res);
      });
    });
  }
  getProjectList() {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getprojects';
      this.http.get(url).subscribe((res: Array<Project>) => {
        if (res.length != 0) {
          this.project = res[0].id;
          this.projectList = res;
        } else {
          console.log("No projects found !");
        }
        resolve(this.projectList);
      });
    });
  }
  getIntentDetails(projectid, intent) {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getintentdetails/' + projectid + '/' + intent;
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
  deleteIntent(projectid, intent) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/deleteintent';
      this.http.post(url, { intent: intent, projectid: projectid }, httpOptions).subscribe(res => {
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
      //let url = 'http://localhost:4203/train/' + projid;
      let url = 'http://35.200.131.47:4203/train/' + projid;
      
      try {
        this.http.get(url).subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
      } catch (error) {
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
  saveProject(project) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/saveproject';
      this.http.post(url, project, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  delProject(project) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/delproject';
      this.http.post(url, project, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }


  showAlert(msg) {
    M.toast({ html: msg, classes: ['white-text'] }, 1000);
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
  getProjectDetails(projectid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = this.apiRoot + '/getprojectdetails';
      this.http.post(url, { pid: projectid }, httpOptions).subscribe(res => {
        if (res['status'] == SUCCESS) {
          resolve(res['data']);
        }
      });
    });
  }
  isProjectExists(pname) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiRoot + '/isprojectexists/'+pname).subscribe(res => {
        resolve(res['status'] == SUCCESS);
      });
    });
  }
}
