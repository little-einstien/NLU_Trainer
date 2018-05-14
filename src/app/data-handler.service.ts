import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  apiRoot: string = "http://localhost:3000";
  samples : Array<any>;
  constructor(private http: HttpClient) { }
  doGET() {
    return new Promise((resolve, reject) => {
     console.log("GET");
       let url = this.apiRoot+'/getsamples';
       this.http.get(url).subscribe(res => {
         //console.log(res);
         this.samples = res['rasa_nlu_data'].common_examples;
         resolve(this.samples);
       });
   });
  }
  getSample(intent):Object{
    return new Promise((resolve, reject) => {
      for(var i = 0 ; i < this.samples.length ;  i++){
        if(samples[i].intent == intent){
          resolve(sample[i]);
          break;
        }
      }
    });
  }
}
