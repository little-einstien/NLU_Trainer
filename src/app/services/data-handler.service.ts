import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Intent } from '../models/intent';
import * as M from 'materialize-css';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  public static FAILURE = "failure";
  public static SUCCESS = "success";
  private projectSource = new BehaviorSubject(new Project('', 0, ''));
  public currentProject = this.projectSource.asObservable();
  private intentSource = new BehaviorSubject('');
  public currentIntent = this.intentSource.asObservable();
  public apiRoot: string = environment.api_endpoint;
  public nlu_ep = environment.nlu_endpoint;
  public projectList: Array<Project>;
  public intents: Array<Intent>;
  public project;
  constructor(private http: HttpClient) { }
  
  /**
   * 
   * 
   * */  
  getIntentList(pid, pno) {
    return new Promise((resolve, reject) => {
      let url = `${this.apiRoot}/getintents/${pid}/${pno}`;
      this.http.get(url).subscribe((res:any) => {
        this.intents = res.data;
        resolve(res);
      });
    });
  }
  /**
   * 
   * 
   * */
  getProjectList() {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/api/projects';
      this.http.get(url).subscribe((res:any) => {
        if (res.status == DataHandlerService.SUCCESS) {
          this.project = res.data[0].id;
          this.projectList = res.data;
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

  trainModel(pid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      try {
        this.http.get(`this.nlu_ep/${pid}`).subscribe(res => {
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
      let url = this.apiRoot + '/api/projects';
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
      let url = `${this.apiRoot}/api/projects/${project.id}`;
      this.http.put(url, project, httpOptions).subscribe(res => {
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
  getProjectDetails(projectid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = `${this.apiRoot}/api/projects/${projectid}`;
      this.http.get(url, httpOptions).subscribe(res => {
        if (res['status'] == DataHandlerService.SUCCESS) {
          resolve(res['data'][0]);
        }
      });
    });
  }
  isProjectExists(pname) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiRoot + '/api/projects/' + pname).subscribe(res => {
        resolve(res['status'] == DataHandlerService.SUCCESS);
      });
    });
  }
  changeProject(project: Project) {
    this.projectSource.next(project);
  }
  changeIntent(intent){
    this.intentSource.next(intent);
  }
  getFlow(pid) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiRoot + '/api/flows/' + pid).subscribe(res => {
        if (res['status'] == DataHandlerService.SUCCESS) {
          resolve(res['data'][0]);
        }else{
           resolve(null);
        }
        
      });
    });
  }
  saveFlow(details) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = `${this.apiRoot}/api/flows/${details.pid}`;
      this.http.put(url, details, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }
}
