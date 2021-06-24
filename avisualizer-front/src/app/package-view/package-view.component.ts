import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';
import { NavUtils } from '../utils/NavUtils';
import { HeaderUtils } from '../utils/HeaderUtils';
import { SystemViewComponent } from '../system-view/system-view.component';
import { ClassViewComponent } from '../class-view/class-view.component';
import {HttpClient} from '@angular/common/http';
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
  private path;
  private classViewData;
  private classView;
  readonly apiURL : string;
  constructor(private http : HttpClient) {  
	this.apiURL  = 'http://localhost:8000'; 

  }

  ngOnInit(): void {
    //read data from JSON
     this.path=["./assets/spaceweathertsi/SpaceWeatherTSI-PV.json",'./assets/guj/Guj-PV.json','./assets/geostore/Geostore-PV.json'];

  }

  private readPackageView(data: any[],name,map): void{

    
  var findObjectByLabel = function(objs, label) {
  if(objs.name === label) { 
    return objs; 
    }
  else{
    if(objs.children){
      for(var i in objs.children){
        let found = findObjectByLabel(objs.children[i],label)
        if(found) return found
      }
    }
  }
};
	var obj = findObjectByLabel(data, name);
	
	this.root = d3.hierarchy(obj);


    this.root.sum(d => d.value)
    .sort((a, b) =>  b.value - a.value);

    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);

    pack(this.root);

    this.zoomProp.focus = this.root;

    //Fetch Annotations Schemas
    //const anot = new AnnotationSchemas(this.root,'package');
    this.schemasMap = map;
    
          	var file = d3.select("#projectSelectBox").select("select option:checked").attr("value");
  	console.log(this.apiURL+'/projects/'+file+"/"+file+"-CV.json")
		this.http.get(this.apiURL+'/'+file+"/"+file+"-CV.json")
		.subscribe(resultado => { 
			this.classViewData=resultado as any[];
			console.log(this.classViewData)
		});
    //Create the table with Annotation Schemas
   
	
    this.svg = SVGUtils.createSvg(".svg-container-pv",this.width,this.height,"pacote");
    d3.select(".svg-container-pv").attr("lastSelected",this.root.data.name);
    d3.select(".svg-container-pv").attr("lastClicked","");
    d3.select(".svg-container-pv").attr("lastClass","");
    d3.select(".svg-container-pv").attr("rootName",this.root.children[0].data.name);
    d3.select(".svg-container-pv").on("click",(event,d)=>{
    		SVGUtils.showView("package-view","system-view");
    		HeaderUtils.headerUpdate('Package View', 'Package: ' + d3.select(".svg-container-sv").attr("lastSelected"));
    		NavUtils.updateSelectBoxText("SelectViewBox","systemView");
    })	

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
        	if(d.data.type=="package"){
        		d3.select(".svg-container-pv").attr("lastSelected",d.data.name)
			CircleUtils.highlightNode('.svg-container-pv', d.data.name);
			this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, '.svg-container-pv'));
			HeaderUtils.headerUpdate('Package View', 'Package: ' + d.data.name);
        	}else if(d.data.type=="class" || d.data.type=="interface"){
			this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node),event.stopPropagation(),SVGUtils.setFocus(d.data.name,".svg-container-pv"))
			CircleUtils.highlightNode(".svg-container-pv",d.data.name);        	
        	}else if (d.data.type=="annotation"){
        		d3.select(".svg-container-pv").attr("lastSelected",d.parent.data.name)
        		
        	        d3.select(".svg-container-cv").selectAll("*").remove();
        	        d3.select(".svg-container-cv").attr("lastSelected",d.parent.parent.data.name)       		
        	        this.classView = new ClassViewComponent(this.http);
        	        this.classView.readPackageView(this.classViewData as any[],d.parent.data.name,0,"") 
        	        SVGUtils.showView("package-view","class-view");
		        SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-cv");  
		        NavUtils.updateSelectBoxText("SelectViewBox","classView");  
		        HeaderUtils.headerUpdate('Class View', 'Class: ' + d.parent.data.name);  
		        this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),event.stopPropagation(), SVGUtils.setFocus(d.parent.data.name, '.svg-container-pv')); 	
               }
        })
	.on("mouseover", (event,d) => {
		console.log(d.data.type)
		SVGUtils.createPopUp(d,this.svg,event)
		var name = d.data.properties.schema;
		d3.select(".svg-container-pv").selectAll("circle").each(function(d,i){
			if(d3.select(this).attr("schema")==name){				
				var color = d3.select(this).style("fill");
				d3.select("tbody").selectAll("td").each(function(d,i){
					if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){						
						d3.select(this).style("color",color)
					}
						
				});
			}

		});
	})
	.on("mouseout", (event,d) => {
		SVGUtils.destroyPopUp(this.svg)
		var name = d.data.properties.schema;
		d3.select(".svg-container-pv").selectAll("circle").each(function(d,i){
			if(d3.select(this).attr("schema")==name){				
				var color = d3.select(this).style("fill");
				d3.select("tbody").selectAll("td").each(function(d,i){
					if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){						
						d3.select(this).style("color","black")
					}
						
				});
			}

		});
		
	})
	.on("mousemove",(event,d)=>SVGUtils.movePopUp(d,this.svg,event))
	.on("contextmenu", (event,d)=> {
            event.preventDefault();

        });

                                              	

  }
	
		
	
}

interface ZoomProp{
  [focus: string]: any
}
