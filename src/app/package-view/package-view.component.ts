import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';

@Component({
  selector: 'package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent implements OnInit {

  private svg;
  private node;
  private root;
  private width = 960;
  private height = 960;
  private focus;
  private view;
  private schemasMap;
 
  constructor() { }

  ngOnInit(): void {
    //read data from JSON
    d3.json("./assets/SpaceWeatherTSI-PV.json").then(data => this.readPackageView(data as any[]))
                                               .catch(error => console.log(error));
       
  }

  private readPackageView(data: any[]): void{
    this.root = d3.hierarchy(data);
    
    this.root.descendants().forEach(d => {
        d.data.value = d.data.value+1;//adding 1 to each AA, to avoid 0
    });
   
    this.root.sum(d => d.value)
    .sort((a, b) =>  b.value - a.value);
    
    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);
    
    pack(this.root); 
    
    this.focus = this.root;
    
    //Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root);
    this.schemasMap = anot.getSchemasColorMap();
    
    //Create the table with Annotation Schemas
    SchemaTableComponent.populateSchemasTable(anot);

    this.svg = SVGUtils.createSvg(".svg-container-pv",this.width,this.height);
    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    this.zoomTo([this.root.x, this.root.y, this.root.r * 2]);
    //Color all circles
    d3.selectAll("circle").attr("stroke", d => CircleUtils.addCircleStroke(d))
                          .attr("stroke-dasharray", d=> CircleUtils.addCircleDashArray(d))
                          .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
   
  }

  private zoom(event,root){

  }

  private zoomTo(v: any[]){
    const k = this.width / v[2];

    this.view = v;

    this.node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    this.node.attr("r", d => d.r * k);
  }
}