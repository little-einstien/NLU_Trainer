import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as M from 'materialize-css';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DataHandlerService } from '../../services/data-handler.service';
import { WindowRef } from '../../common/WindowRef';
@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})
export class RegistrationStepperComponent implements OnInit {
  public title: string;
  public remarks: string;
  public st: Date;
  public et: Date;
  public schedulingData = [{ date: new Date(), slots: ["1.00pm", "2.00pm", "1.00pm", "2.00pm"] }, { date: new Date(), slots: ["1.00pm", "2.00pm", "1.00pm", "2.00pm"] }, { date: new Date(), slots: ["1.00pm", "2.00pm", "1.00pm", "2.00pm"] }];
  @ViewChild('sdate') sdate: ElementRef;
  @ViewChild('stime') stime: ElementRef;
  @ViewChild('edate') edate: ElementRef;
  @ViewChild('etime') etime: ElementRef;
  @Input('response') response:any = {
    "s1" : {
        "sd_lbl" : "Start Date",
        "ed_lbl" : "End Date",
        "st_lbl" : "Start Time",
        "et_lbl" : "End Time"
    },
    "s2" : {
        "fields" : [ 
            {
                "ph" : "Please enter the name of the person",
                "lbl" : "Name of person"
            }, 
            {
                "ph" : "Your age",
                "lbl" : "Enter the age"
            }, 
            {
                "ph" : "Address of the person",
                "lbl" : "Address of the person"
            }
        ]
    },
    "s3" : {
        "btn_txt" : "Register please",
        "btn_txt_clr" : "#a211e5",
        "btn_clr" : "#9f11e6",
        "msg" : "Are you sure you want to confirm"
    }
};
  constructor(private dataHandlerService: DataHandlerService,private winRef: WindowRef) {
    setTimeout(() => {
      M.Datepicker.init(document.querySelectorAll('.datepicker'), {});
      M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
    }, 1000);
  }

  ngOnInit() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
    setTimeout(()=> {this.winRef.nativeWindow.initStepper()},1000)

  }
  saveAppointment() {
    let startDate = M.Datepicker.getInstance(this.sdate.nativeElement);
    let startTime = M.Timepicker.getInstance(this.stime.nativeElement);
    let endDate = M.Datepicker.getInstance(this.edate.nativeElement);
    let endTime = M.Timepicker.getInstance(this.etime.nativeElement);

    startDate.date.setHours(startTime.hours);
    startDate.date.setMinutes(startTime.minutes);

    endDate.date.setHours(endTime.hours);
    endDate.date.setMinutes(endTime.minutes);
    let pid = '';
    this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    this.dataHandlerService.saveAppointment({
      pid: pid,
      title: this.title,
      remarks: this.remarks,
      st: startDate.date.toISOString(),
      et: endDate.date.toISOString(),
      ap_with: "Arnav",
      "user": { "id": "ww", "name": "gdfgd" }
    });
  }
  addFileds() {
    this.response.s2.fields.push({ lbl: '', ph: '' });
  }
   deleteField(i) {
    _.remove(this.response.s2.fields, function (n, k) {
      return k == i;
    });
  }
}
