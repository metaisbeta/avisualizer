import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';
import * as loDash from 'lodash';

@Component({
  selector: 'class-view',
  templateUrl: './class-view.component.html',
  styleUrls: ['./class-view.component.css']
})

export class ClassViewComponent implements OnInit {

  private svg;
  private node;
  private root;
  private svg_locad;
  private node_locad;
  private root_locad;
  private width = 960;
  private height = 960;
  private schemasMap;
  private zoomProp: ZoomProp = {};
  private zoomProp_locad: ZoomProp = {};
  private selectedNode: any; 
 
 constructor() {  }

  ngOnInit(): void {
    //read data from JSON
    d3.json("./assets/SpaceWeatherTSI-CV.json").then(data => this.readPackageView(data as any[]))
                                               .catch(error => console.log(error));
                        
       
  }

private readPackageView(data: any[]): void{
    
    this.root = d3.hierarchy(data);
        this.root.descendants().forEach(d => {
        
        d.data.value = d.data.value+1;//adding 1 to each AA, to avoid 0
    });
    this.root.sum(d => {d.value;if(d.type=="annotation") d.value=parseInt(d.properties.aa)+1; else if(Number.isNaN(d.value)) d.value=0;})
    .sort((a, b) => { b.value - a.value; console.log(b.value,a.value)});
    
    console.log(this.root.sum(d=>d.value),"error");
    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);
         
    pack(this.root); 
    
    this.zoomProp.focus = this.root;
    
    
    //Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root,"class");  
    this.schemasMap = anot.getSchemasColorMap();
    //Create the SVG
    this.svg = SVGUtils.createSvg(".svg-container-cv",this.width,this.height,"classe");
    d3.select(".svg-container-cv").attr("lastSelected",String(this.root.data.name));
    d3.select(".svg-container-cv").attr("rootName",this.root.data.name);
    d3.select(".svg-container-cv").selectAll("circle").each(d=>console.log(d));
    //Create the nodes
    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2],this.svg, this.zoomProp,this.node);
    var title = d3.select("#headerCV").text()+": Project "+this.root.data.name;
    d3.select("#headerCV").select("h1").text(title);
    //Color all circles
    d3.selectAll("circle").attr("stroke", d => CircleUtils.addCircleStroke(d))
                          .attr("stroke-dasharray", d=> CircleUtils.addCircleDashArray(d))
                          //.attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
                            .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap)); 
    //Apply zoom to all circles in this specific view
    this.svg.selectAll("circle")
        .on("click", (event, d) => {this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(d.data.name,".svg-container-sv"))})
	.on("mouseover", (event,d) => SVGUtils.createPopUp(d,this.svg,event))
	.on("mouseout", (event,d) => SVGUtils.destroyPopUp(this.svg))
	.on("mousemove",(event,d)=>SVGUtils.movePopUp(d,this.svg,event));



	
    
  }
  public setaaa():void{
	this.width=0;
  }
	
}







interface ZoomProp{
  [focus: string]: any
}






