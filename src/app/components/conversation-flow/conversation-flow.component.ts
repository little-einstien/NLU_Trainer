import { Component, OnInit, ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import * as M from 'materialize-css';
import { DataHandlerService } from '../../services/data-handler.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-conversation-flow',
  templateUrl: './conversation-flow.component.html',
  styleUrls: ['./conversation-flow.component.css']
})
export class ConversationFlowComponent implements OnInit {
  structure = {};
  startingNode ; 
  node = {id :'',label:'',color:'',txt_color :'',btn_txt:'',as_btn:false};
  msg = '';
  btnTxt = '';
  btnClr = 'blue';
  txtColor = 'white-text';
  network;
  nodes = new DataSet([]);
  edges = new DataSet([]);
  isNewFlow = true;
  project;
  @ViewChild('mynetwork') mynetwork: ElementRef;
  @ViewChild('newnodemodal') newnodemodal: ElementRef;
  constructor(private dataService: DataHandlerService,private router: Router,private spinner : NgxSpinnerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }
  ngOnInit(){
    this.dataService.currentProject.subscribe(project => this.project = project)
    this.spinner.show();
    this.dataService.getFlow(this.project.id).then((data: any) => {
      this.startingNode = data.sp;
      
       if(data.flow.nodes)
        this.nodes = new DataSet(Object.values(data.flow.nodes));
      if(data.flow.edges)
        this.edges = new DataSet(Object.values(data.flow.edges));
      // for (var i = 0; i < data.flow.length; i++) {
      //   this.nodes.add({ id: data.flow[i].nid, label: data.flow[i].text });
      //   if (data.flow[i].children) {
      //     for (var j = 0; j < data.flow[i].children.length; j++) {
      //       this.edges.add({ from: data.flow[i].nid, to: data.flow[i].children[j] })
      //     }
      //   }
      //   if (i == data.flow.length - 1) {
      //     this.intialize();
      //   }
      // }
      setTimeout(() => {
        this.intialize();
      },250);
    });
    setTimeout(() => {
      this.intialize();
    },250);
  }
  intialize() {
    M.Modal.init(document.querySelectorAll('.modal'), {});
    // create an array with edges
    // this.edges = new DataSet([]);
    // let blockref = this;
    // // create a network
    // var container = document.getElementById('mynetwork');
    var data = {
      nodes: this.nodes,
      edges: this.edges
    };
    debugger;
    var options = {
      physics: { barnesHut: { gravitationalConstant: -4000 } },
      nodes: {
        color: 'orange',
        shape: 'square',
        heightConstraint: { minimum: 50, valign: 'middle' },
        widthConstraint: { minimum: 100, maximum: 100 }
      },
      edges: {
        arrows: 'to',
        color: 'red',
        font: '12px arial #ff0000',
        scaling: {
          label: true,
        },
        shadow: true,
        smooth: true,
      },
      manipulation: {
        enabled: true,
        initiallyActive:true,
        deleteNode: function (params, callback) {
          console.log('delete Event:', params);
          callback(params);
        }, addNode: (params, callback) => {
          console.log('Node added');
          console.log(params);
          this.addConversationNode(params);
          callback(params);
        }, addEdge: (params, callback) => {
          console.log('Edge added');
          console.log(params);
          //this.publishLink(params);
          callback(params);
        }

      }
    }
    this.spinner.hide();
    debugger;
    this.network = new Network(this.mynetwork.nativeElement, data, options);
    this.network.setOptions(options);
    this.network.on('doubleClick', (params) => {
      if (params.nodes.length != 0) {
        this.node = this.nodes._data[params.nodes[0]];
        M.Modal.getInstance(this.newnodemodal.nativeElement).open();
        //this.addConversationNode(this.network.getSelectedNodes());
      }

    });
    // network.on("select", function (params) {
    //   console.log('select Event:', params);
    // });
    // network.on("selectNode", function (params) {
    //   console.log('selectNode Event:', params);
    // });
    // network.on("selectEdge", function (params) {
    //   console.log('selectEdge Event:', params);
    // });
    // network.on("deselectNode", function (params) {
    //   console.log('deselectNode Event:', params);
    // });
    // network.on("deselectEdge", function (params) {
    //   console.log('deselectEdge Event:', params);
    // });
    // network.on("hoverNode", function (params) {
    //   console.log('hoverNode Event:', params);
    // });
    // network.on("hoverEdge", function (params) {
    //   console.log('hoverEdge Event:', params);
    // });
    // network.on("blurNode", function (params) {
    //   console.log('blurNode Event:', params);
    // });
    // network.on("blurEdge", function (params) {
    //   console.log('blurEdge Event:', params);
    // });
  }
  addConversationNode(nodes) {
    console.log("nodes");
    console.log(nodes);
    nodes.color = '#FFA500';
    nodes.txt_color = '';
    nodes.btn_txt = '';
    nodes.as_btn  = false;
  }
  addQuestion() {
    this.nodes.update([this.node]);
    this.msg = '';
//    this.structure[this.node].text = this.question;
  //  console.log(this.structure);
  }
  publishLink(data) {
    if (data.from && data.to) {
      if (this.structure[data.from] && this.structure[data.from].child) {
        this.structure[data.from].children.push(data.to);
      } else {
        this.structure[data.from].child = [data.to];
      }
    }
  }
  saveFlow(){
    this.spinner.show();
    this.dataService.currentProject.subscribe(project => this.project = project);
    this.dataService.saveFlow({pid:this.project.id,sp: this.startingNode,
      flow:{nodes:this.nodes._data,edges:Object.values(this.edges._data)}}).then((result)=>{
      if(result['status'] == 'success'){
        this.spinner.hide();
        this.dataService.showAlert('Flow saved successfully');
      }else{
        this.spinner.hide();
        this.dataService.showAlert('Error while saving flow');
      }
    })
  }
  markStartingPoint(){
    if(this.startingNode == this.node.id){
      this.startingNode = '';
    }else{
      this.startingNode = this.node.id;
    }

  }
}
