import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';

@Component({
  selector: 'system-view',
  templateUrl: './system-view.component.html',
  styleUrls: ['./system-view.component.css']
})
export class SystemViewComponent implements OnInit {
  private view;
  private schemasMap;
  private svg;
  private node;
  private root;
  private width = 960;
  private height = 960;
  private focus: any;
  private zoomProp: ZoomProp = {};
 
  constructor() { }

  ngOnInit(): void {
    //read data from JSON
    d3.json("./assets/SpaceWeatherTSI-SV.json").then(data => this.readPackageView(data as any[]))
                                               .catch(error => console.log(error));
       
  }

  private readPackageView(data: any[]): void{
    
    this.root = d3.hierarchy(data);
    
    this.root.sum(d => d.size)
             .sort((a, b) =>  b.size - a.size);

      
    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);
    
    pack(this.root); 

    this.zoomProp.focus = this.root;
    
    //Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root);
    this.schemasMap = anot.getSchemasColorMap();
    
    //Create the SVG
    this.svg = SVGUtils.createSvg(".svg-container-sv",this.width,this.height,"sistema");
    //Create the nodes
    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2],this.svg, this.zoomProp,this.node);
    
    //Color all circles
    d3.selectAll("circle").attr("stroke", d => CircleUtils.addCircleStroke(d))
                          .attr("stroke-dasharray", d=> CircleUtils.addCircleDashArray(d))
                          .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
    
    //Apply zoom to all circles in this specific view
    this.svg.selectAll("circle")
        .on("click", (event, d) => this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation()))
	.on("mouseover", (event,d) => SVGUtils.createPopUp(d,this.svg,event))
	.on("mouseout", (event,d) => SVGUtils.destroyPopUp(this.svg))
	.on("mousemove",(event,d)=>SVGUtils.movePopUp(d,this.svg,event));
	
  }
}

interface ZoomProp{
  [focus: string]: any
}
