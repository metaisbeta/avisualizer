import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';

@Component({
  selector: 'package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent implements OnInit {

  private svg;
  private node;
  private root;
  public width = 960;
  private height = 960;
  public schemasMap;
  private zoomProp: ZoomProp = {};
  private selectedNode: any; 
 
  constructor() {  }

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
    
    this.zoomProp.focus = this.root;
    
    //Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root,"aa");
    this.schemasMap = anot.getSchemasColorMap();
    console.log(this.schemasMap.size);
    	
    //Create the table with Annotation Schemas
    SchemaTableComponent.populateSchemasTable(anot);

    this.svg = SVGUtils.createSvg(".svg-container-pv",this.width,this.height,"pacote");
    d3.select(".svg-container-pv").attr("lastSelected",this.root.data.name);
    d3.select(".svg-container-pv").attr("rootName",this.root.data.name);
    var title = d3.select("#headerPV").text()+": Project "+this.root.data.name;
    d3.select("#headerPV").select("h1").text(title);
    
    	
    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2],this.svg, this.zoomProp,this.node);
    
    //Color all circles
    //this.svg.selectAll("circle").each(function(d){if(d.data.type=="annotation")console.log(d.data.value);});	
    d3.selectAll("circle").attr("stroke", d => CircleUtils.addCircleStroke(d))
                          .attr("stroke-dasharray", d=> CircleUtils.addCircleDashArray(d))
                          .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
    //Apply zoom to all circles in this specific view
    this.svg.selectAll("circle")
        .on("click", (event, d) => {
                if(d.data.name.includes(String(d3.select(".svg-container-sv").attr("lastSelected"))) || d.data.name==String(d3.select(".svg-container-sv").attr("lastSelected"))){
                if(d.data.type!="class"){
               	this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(String(d.data.type)=="class" ? d.parent.data.name: d.data.name,".svg-container-pv"))
        	 
                }    		
        		       
        	}else if(d.data.type=="package"){
        		d3.select("system-view").attr("hidden",null);
        		d3.select("package-view").attr("hidden","");
        	}else if(d.data.type=="annotation" && d.parent.data.name.includes(String(d3.select(".svg-container-pv").attr("lastSelected")))){
                       console.log("annot");  
                	this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(String(d.parent.data.name),".svg-container-pv"))
        		d3.select("class-view").attr("hidden",null);
        		d3.select("package-view").attr("hidden","");
        		SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-cv");
                }
        })
	.on("mouseover", (event,d) => SVGUtils.createPopUp(d,this.svg,event))
	.on("mouseout", (event,d) => SVGUtils.destroyPopUp(this.svg))
	.on("mousemove",(event,d)=>SVGUtils.movePopUp(d,this.svg,event))
		.on("contextmenu", (event,d)=> {
                    var popup = d3.select(".svg-container-pv")
            .append("div")
            .attr("class", "popup")
            .style("position","fixed")
            .style("left",0+ "px")
            .style("top",110+ "px")
            .style("background-color","#fff")
            .style("width",200)
            .style("overflow","auto");
        popup.append("h2").text("Testando popup");
        popup.append("p").html(
            "The popUp display"+"<br/>"+d.data.name)
        popup.append("select").append("option").text("aa");
       
            event.preventDefault();
           // react on right-clicking
        });
       
       
  }

}

interface ZoomProp{
  [focus: string]: any
}
