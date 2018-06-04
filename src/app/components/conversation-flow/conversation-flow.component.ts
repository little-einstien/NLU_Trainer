import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network, DataSet, Node, Edge, IdType } from 'vis';

@Component({
  selector: 'app-conversation-flow',
  templateUrl: './conversation-flow.component.html',
  styleUrls: ['./conversation-flow.component.css']
})
export class ConversationFlowComponent implements OnInit {
  @ViewChild('mynetwork') mynetwork: ElementRef;
  constructor() { }
  layout = [];
  ngOnInit() {
    var nodes = new DataSet([
      { id: 1, label: 'NodeNodeN o deNodeNodeN o d e N od e N o d e N o  d e N o d e N o d e N o d e NodeN o d e N  od e N  o d e N o d e N o d e N o d e N o d e N  o d e N o d e N o d e N o  d e N o  d e N o d e N o d e N o d e '   , shape: 'box'  },
      { id: 2, label: 'Node 2',shape: 'box'},
      { id: 3, label: 'Node 3',shape: 'box'  },
      { id: 4, label: 'Node 4',shape: 'box'  },
      { id: 5, label: 'Node 5',shape: 'box'  }
    ]);
    // create an array with edges
    var edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);
    // create a network
    // var container = document.getElementById('mynetwork');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {
      nodes:{color: 'orange',
      heightConstraint:{minimum : 50,valign:'middle'},
      widthConstraint:{minimum : 100,maximum:100}},
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
        deleteNode : function (params,callback) {
          console.log('delete Event:', params);
          callback(params);
        },addNode : function (params,callback) {
          console.log('add Event:', params);
          params.label  = 'New End point';
          params.shape=  'box' 
          params.color = 'lime'
          
          callback(params);
        }
      }, layout: {
        hierarchical: {
            direction: "UD"
        }
    }
    }
    debugger;
    var network = new Network(this.mynetwork.nativeElement, data, options);
    network.setOptions(options);
    network.on('click', (obj) => {
      console.log(network.getSelectedNodes());

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

}
