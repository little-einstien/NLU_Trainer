import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  private baseURL: string = "http://localhost/api";
  // private token: string = environment.token;
  private token: string = "ce1d01dc31b946fa8740ae14100f5ddb";
   project: string = "ce1d01dc31b946fa8740ae14100f5ddb";

  constructor(private http: HttpClient){}

  public getResponse(msg,botInitialized){
    debugger;
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };  
      this.http.post(this.baseURL, {pid:this.project,q:msg,sid:botInitialized ? '1' : '2',nbot : botInitialized }, httpOptions).subscribe(res => {
        resolve(res);
      });
    });
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}
