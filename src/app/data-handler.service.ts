import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  apiRoot: string = "http://localhost:3000";
  projectList;
  intents;
  project;
  constructor(private http: HttpClient) {
    console.log("Constructor of service called");
    // this.getProjectList().then((list)=>{
    //   this.doGET();
    // });
  }
  getIntentList(project) {
    return new Promise((resolve, reject) => {
      console.log(this.project + " present");
      let url = this.apiRoot + '/getintents/' + project;
      this.http.get(url).subscribe(res => {
        this.intents = res;
        resolve(this.intents);
      });
    });
  }
  getProjectList() {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getprojects';
      this.http.get(url).subscribe(res => {
        if (res) {
          this.project = res[0].id;
          this.projectList = res;
        }
        resolve(this.projectList);
      });
    });
  }
  getIntentDetails(projectid,intent) {
    return new Promise((resolve, reject) => {
      let url = this.apiRoot + '/getintentdetails/'+projectid+'/'+intent;
      this.http.get(url).subscribe(res => {
        //console.log(res);
        //  this.samples = res['details'];
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
  trainModel(projid) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      let url = 'http://localhost/train/'+projid;
      this.http.get(url).subscribe(res => {
        resolve(res);
      });
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
}
