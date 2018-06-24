import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as M from 'materialize-css';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DataHandlerService } from '../../services/data-handler.service';
import { WindowRef } from '../../common/WindowRef';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
 
@Component({
  selector: 'app-registration-stepper',
  templateUrl: './registration-stepper.component.html',
  styleUrls: ['./registration-stepper.component.css']
})
export class RegistrationStepperComponent implements OnInit {
  public project;
  public title: string;
  public remarks: string;
  public st;
  public et;
  public schedulingData = [];
  public name;
  public mobile;
  public email;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday  
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  @ViewChild('sdate') sdate: ElementRef;
  @ViewChild('stime') stime: ElementRef;
  @ViewChild('edate') edate: ElementRef;
  @ViewChild('etime') etime: ElementRef;
  @Input('response') response: any = {
    "s1": {
      "sd_lbl": "Start Date",
      "ed_lbl": "End Date",
      "st_lbl": "Start Time",
      "et_lbl": "End Time"
    },
    "s2": {
      "fields": [
        {
          "ph": "Please enter the name of the person",
          "lbl": "Name of person"
        },
        {
          "ph": "Your age",
          "lbl": "Enter the age"
        },
        {
          "ph": "Address of the person",
          "lbl": "Address of the person"
        }
      ]
    },
    "s3": {
      "btn_txt": "Register please",
      "btn_txt_clr": "#a211e5",
      "btn_clr": "#9f11e6",
      "msg": "Are you sure you want to confirm"
    }
  };
  constructor(private dataHandlerService: DataHandlerService, private winRef: WindowRef) {
    setTimeout(() => {
      M.Datepicker.init(document.querySelectorAll('.datepicker'), { onSelect: function (date) { console.log(this) } });
      M.Timepicker.init(document.querySelectorAll('.timepicker'), {});
    }, 1000);
  }
  daySelected(date) {
    this.dataHandlerService.getSlotsDatewise('arnav', date.getTime()).then((slots) => {
      console.log(slots);
    });
  }
  ngOnInit() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
    setTimeout(() => { this.winRef.nativeWindow.initStepper() }, 1000)
    this.dataHandlerService.currentProject.subscribe(project => this.project = project);
    this.dataHandlerService.getUsers(this.project.id).then((users) => {
      this.dataHandlerService.getSlots(users[0].username).then((slots: [any]) => {
        this.schedulingData = slots;
        console.log(this.schedulingData);
      });
    });


  }
  saveAppointment() {
    // let startDate = M.Datepicker.getInstance(this.sdate.nativeElement);
    // let startTime = M.Timepicker.getInstance(this.stime.nativeElement);
    // let endDate = M.Datepicker.getInstance(this.edate.nativeElement);
    // let endTime = M.Timepicker.getInstance(this.etime.nativeElement);

    // startDate.date.setHours(startTime.hours);
    // startDate.date.setMinutes(startTime.minutes);

    // endDate.date.setHours(endTime.hours);
    // endDate.date.setMinutes(endTime.minutes);
    let pid = '';
    this.dataHandlerService.currentProject.subscribe(project => pid = project.id);
    this.dataHandlerService.saveAppointment({
      pid: pid,
      date : this.st.getTime(),
      slot:this.selectedSlot,
      "user": { "id": "ww", "name": this.name,"mobile":this.mobile,"email":this.email }
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
  public mslots;
  public eslots;
  public selectedSlot;
  getSlots() {
    console.log(this.st)
    this.dataHandlerService.getSlotsDatewise('arnav', this.st.getTime()).then((slots:any) => {
      if(slots && slots.length != 0){
        this.mslots = slots[0]['m_slt'];
        this.eslots = slots[0]['e_slt'];
      }else{
        this.mslots = [];
        this.eslots = [];
      }
      
    });
  }
  onSelectionChange(slot){
    this.selectedSlot = slot;
    //alert(slot);
  }
}
