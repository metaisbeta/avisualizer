import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';
import { NavUtils } from '../utils/NavUtils';

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
  private selectedNode: any;
  constructor() { 
	this.node=null;
        this.root=null;
  }

  ngOnInit(): void {
    //read data from JSON
    d3.json("./assets/SpaceWeatherTSI-SV.json").then(data => this.readPackageView(data as any[]))
                                               .catch(error => console.log(error));
       
  }
  
  private readPackageView(data: any[]): void{
    
    this.root = d3.hierarchy(data);
    
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

    //Create the SVG
    this.svg = SVGUtils.createSvg(".svg-container-sv",this.width,this.height,"sistema");
    d3.select(".svg-container-sv").attr("lastSelected",String(this.root.data.name));
    d3.select(".svg-container-sv").attr("rootName",this.root.data.name);
    //Create the nodes
    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2],this.svg, this.zoomProp,this.node);
    var title = d3.select("#headerSV").text()+": Project "+this.root.data.name;
    d3.select("#headerSV").select("h1").text(title);

    //Color all circles
    d3.select(".svg-container-sv").selectAll("circle").attr("stroke", d => CircleUtils.addCircleStroke(d))
                          .attr("stroke-dasharray", d=> CircleUtils.addCircleDashArray(d))
                          
                            .attr("fill", d => CircleUtils.colorCircles(d,this.schemasMap));
    //Apply zoom to all circles in this specific view
    this.svg.selectAll("circle")
        .on("click", (event, d) => {
                d3.select("#packagesList").selectAll("option").each(function(e,i){
        		if(d3.select(this).attr("value")==d.parent.data.name && d.data.type=="schema")
        			return d3.select(this).property("selected",true);
        		else if (d3.select(this).attr("value")==d.data.name)	
        			return d3.select(this).property("selected",true);
        	})
        	d3.select("#classList").selectAll("option").remove();
		d3.select("#classes").select("select").append("option").text("Select Class").attr("value","select class");
        	if(d.data.type=="schema"){
	
        	
				var classes = NavUtils.getClassName(d3.select(".svg-container-pv"),d.parent.data.name);
				NavUtils.insertOptions(".svg-container-pv","classes","classList",classes);	
				CircleUtils.highlightNode(".svg-container-sv",d.parent.data.name); 
        		       this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node),	event.stopPropagation(),SVGUtils.setFocus(d.parent.data.name,".svg-container-sv"))
        		       d3.select("package-view").attr("hidden",null);
        		       d3.select("system-view").attr("hidden","");
        		       SVGUtils.viewTransition(String(d3.select(".svg-container-sv").attr("lastSelected")),".svg-container-pv");
        		       d3.select("#headerSV").attr("hidden","");
			       d3.select("#headerPV").attr("hidden",null);
        		       	
        	}else{       	        			
		      CircleUtils.highlightNode(".svg-container-sv",d.data.name); 
        	      this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node),	event.stopPropagation(),SVGUtils.setFocus(d.data.name,".svg-container-sv"))
        	     }

        })
	.on("mouseover", (event,d) => SVGUtils.createPopUp(d,this.svg,event))
	.on("mouseout", (event,d) => SVGUtils.destroyPopUp(this.svg))
	.on("mousemove",(event,d)=>SVGUtils.movePopUp(d,this.svg,event))
	.on("contextmenu", (event,d)=> {
            event.preventDefault();
        
        });
        NavUtils.createSelectBox("packages","packagesList","Select Package","select package","Package List",80,400,".svg-container-sv");
	NavUtils.createSelectBox("classes","classList","Select Class","select class","Class List",200,400,".svg-container-pv");
	NavUtils.createSelectBox("interfaces","interfaceList","Select Interface","select interface","Interface List",320,400,".svg-container-pv");
	NavUtils.createSelectBox("methods","methodList","Select Method","select method","Method List",440,400,".svg-container-cv");
	NavUtils.createSelectBox("fields","fieldList","Select Field","select field","Field List",560,400,".svg-container-cv");
	

  }
  
	
}






interface ZoomProp{
  [focus: string]: any
}
