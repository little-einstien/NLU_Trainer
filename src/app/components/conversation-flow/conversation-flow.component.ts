import { Component, OnInit, ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import * as M from 'materialize-css';
import { DataHandlerService } from '../../services/data-handler.service';
@Component({
  selector: 'app-conversation-flow',
  templateUrl: './conversation-flow.component.html',
  styleUrls: ['./conversation-flow.component.css']
})
export class ConversationFlowComponent implements OnInit {
  structure = {};
  node;
  question = '';
  network;
  nodes = new DataSet([]);
  edges = new DataSet([]);
  @ViewChild('mynetwork') mynetwork: ElementRef;
  @ViewChild('newnodemodal') newnodemodal: ElementRef;
  constructor(private dataService: DataHandlerService) {
    this.dataService.getFlow("2323").then((data: any) => {
      debugger;
       if(data.flow.nodes)
        this.nodes = new DataSet(data.flow.nodes);
      if(data.flow.edges)
        this.edges = new DataSet(data.flow.edges);
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
      this.intialize();
    })
  }
  ngOnInit() { }
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
        deleteNode: function (params, callback) {
          console.log('delete Event:', params);
          callback(params);
        }, addNode: (params, callback) => {
          console.log('Node added');
          console.log(params);
          //this.addConversationNode(params.nodes = [params.id]);
          callback(params);
        }, addEdge: (params, callback) => {
          console.log('Edge added');
          console.log(params);
          //this.publishLink(params);
          callback(params);
        }

      }
    }
    debugger;
    this.network = new Network(this.mynetwork.nativeElement, data, options);
    this.network.setOptions(options);
    this.network.on('doubleClick', (params) => {
      if (params.nodes.length != 0) {
        this.node = params.nodes[0];
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
    if (nodes.length != 0) {
      for (let i = 0; i < nodes.length; i++) {
        this.node = nodes[i];
        this.structure[nodes[i]] = {nid : nodes[i]};
      }
    }
  }
  addQuestion() {
    this.nodes.update([{ id: this.node, label: this.question }]);
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
    this.dataService.saveFlow({pid:"2323",flow:{nodes:this.nodes._data,edges:this.edges._data}}).then((result)=>{
      if(result['status'] == 'success'){
        alert('saved');
      }else{
        alert('failed');
      }
    })
  }
}