import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  apiRoot: string = "http://localhost:3000";
  samples ;
  constructor(private http: HttpClient) {
    console.log("Constructor of service called");
    //this.doGET();
  }
  doGET() {
    return new Promise((resolve, reject) => {
     console.log("GET");
       let url = this.apiRoot+'/getintents';
       this.http.get(url).subscribe(res => {
         //console.log(res);
         this.samples = res;
         resolve(this.samples);
       });
   });
  }
  getIntentDetails(intent){
    return new Promise((resolve, reject) => {
      let url = this.apiRoot+'/getintentdetails/'+intent;
      this.http.get(url).subscribe(res => {
        //console.log(res);
        this.samples = res['details'];
        resolve(this.samples);
      });
    });
  }
}
