import { JsonObject, JsonProperty } from "json2typescript";
export class Project {

  name: string;
  created_date: Date;
  updated_date: Date;
  status: number;
  id: string;
  header:string;
  bg_clr: string;
  h_clr: string;
  ucb_clr: string;
  bcb_clr: string;
  tts: boolean;
  stt: boolean;


  constructor(name: string,status: number,id: string,header?:string,bg_clr?:string,h_clr?:string,ucb_clr?:string,bcb_clr?:string,stt?:boolean,tts?:boolean) {
    this.name = name;
    this.status = status;
    this.id = id;
    this.header = header;
    this.bg_clr =bg_clr;
    this.h_clr =h_clr;
    this.ucb_clr =ucb_clr;
    this.bcb_clr =bcb_clr;
    this.tts = tts ?  true : false;
    this.stt = stt ?  true : false;
  } 
}
