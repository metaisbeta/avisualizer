import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SchemaTableComponent } from '../schema-table/schema-table.component';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import { CircleUtils } from '../utils/CircleUtils';
import { SVGUtils } from '../utils/SVGUtils';
import { ZoomUtils } from '../utils/ZoomUtils';
import { NavUtils } from '../utils/NavUtils';
import { HeaderUtils } from '../utils/HeaderUtils';
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
    //
    //  d3.json("./assets/guj/Guj-PV.json").then(data => this.readPackageView(data as any[]))
    //   .catch(error => console.log(error));

    //
    // d3.json("./assets/geostore/Geostore-PV.json").then(data => this.readPackageView(data as any[]))
     //  .catch(error => console.log(error));

     //d3.json("./assets/shopizer/Shopizer-PV.json").then(data => this.readPackageView(data as any[]))
      // .catch(error => console.log(error));
  }

  private readPackageView(data: any[]): void{

    this.root = d3.hierarchy(data);

    //Now using LOCAD, no need to add 1 anymore
    // this.root.descendants().forEach(d => {
    //
    //     d.data.value = d.data.value+1;//adding 1 to each AA, to avoid 0
    // });

    this.root.sum(d => d.value)
    .sort((a, b) =>  b.value - a.value);

    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);

    pack(this.root);

    this.zoomProp.focus = this.root;

    //Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root,'locad');
    this.schemasMap = anot.getSchemasColorMap();
    //console.log(this.schemasMap.size);
    
    //Create the table with Annotation Schemas
    SchemaTableComponent.populateSchemasTable(anot);

    this.svg = SVGUtils.createSvg(".svg-container-pv",this.width,this.height,"pacote");
    d3.select(".svg-container-pv").attr("lastSelected",this.root.data.name);
    d3.select(".svg-container-pv").attr("lastClicked","");
    d3.select(".svg-container-pv").attr("lastClass","");
    d3.select(".svg-container-pv").attr("rootName",this.root.children[0].data.name);


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
        	if(d.data.type=="package" && (d.data.name.includes(d3.select(".svg-container-sv").
            attr("lastSelected")) ||
            d.data.name==d3.select(".svg-container-sv").attr("lastSelected"))){
		       if(d.data.name==this.root.descendants()[1].data.name){
		       	var node = d.descendants()[0].data.children[0].name;
		       	console.log(node);
		       	d3.select(".svg-container-pv").selectAll('circle').each(function(d, i){
					if (String(d3.select(this).attr('name')) == node){
						console.log("click")
						d3.select(this).dispatch('click');
						
						return this;
					}

				});
				d3.select(".svg-container-sv").attr("lastSelected",node);
		       }else{
		      		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node),event.stopPropagation(),SVGUtils.setFocus(d.data.name,".svg-container-pv"))
			       CircleUtils.highlightNode(".svg-container-pv",d.data.name);
			       d3.select(".svg-container-pv").attr("lastSelected",d.data.name);
			       if(d.data.name==d3.select(".svg-container-sv").attr("lastSelected")){
			       	NavUtils.refreshBox("classList","classes","Select Class","select class",d.data.name,".svg-container-pv","");
						  NavUtils.refreshBox("interfaceList","interfaces","Select Interface","select interface",d.data.name,".svg-container-pv","interface");
			       }
			       NavUtils.updateSelectBoxText("packagesList",d.data.name);
			       //HeaderUtils.setPackageViewHeader("Package",d.data.name,this.root.data.name);
			       HeaderUtils.headerUpdate('Package View', 'Package: ' + d.data.name);
		     } 	


          }else if(d.data.type=="class" || d.data.type=="interface"){
          		
        		//HeaderUtils.setPackageViewHeader("Package",d.parent.data.name,this.root.data.name);
            HeaderUtils.headerUpdate('Package View', d.data.type.charAt(0).toUpperCase() + d.data.type.slice(1) +  ': ' + d.data.name);
        		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(d.parent.data.name,".svg-container-pv"))
        		if(d.data.type=="class")
        			NavUtils.updateSelectBoxText("classList",d.data.name);
        		else
        			NavUtils.updateSelectBoxText("interfaceList",d.data.name);
                       CircleUtils.highlightNode(".svg-container-pv",d.data.name);

        	}else if(d.data.type=="package" && !d3.select(".svg-container-sv").attr("lastSelected").includes(d.parent.data.name)){
			//HeaderUtils.setSystemViewHeader(this.root.data.name);
            		HeaderUtils.headerUpdate('System View', 'Package: ' + d.data.name);
            		NavUtils.updateSelectBoxText("SelectViewBox","systemView");
 			SVGUtils.showView("package-view","system-view");
			NavUtils.resetBox("interfaceList","interfaces","Select Interface","select interface");
			NavUtils.resetBox("classList","classes","Select Class","select class");
			NavUtils.updateSelectBoxText("packagesList",d.data.name);
			d3.select(".svg-container-pv").attr("lastSelected",d.data.name)
        	}else if(d.data.type=="annotation"){
        		
        		d3.select(".svg-container-pv").attr("lastClicked",d.data.name);
        		d3.select(".svg-container-pv").attr("lastClass",d.parent.data.name);
        		//console.log(d3.select(".svg-container-pv").attr("lastClicked"))
        		CircleUtils.highlightNode(".svg-container-sv",d.parent.parent.data.name);
        		if(d.parent.data.type=="class") {
              			NavUtils.updateSelectBoxText("classList", d.parent.data.name);
            		}else {
             			 NavUtils.updateSelectBoxText("interfaceList", d.parent.data.name);
            		}
                	this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(String(d.parent.data.name),".svg-container-pv"))
			SVGUtils.hide(".svg-container-cv",d.parent.data.name);
			SVGUtils.showView("package-view","class-view");
			SVGUtils.viewTransition(String(d3.select(".svg-container-pv").attr("lastSelected")),".svg-container-cv");
			NavUtils.refreshBox("fieldList","fields","Select Field","select field",d.parent.data.name,".svg-container-cv","field");
			NavUtils.refreshBox("methodList","methods","Select Method","select method",d.parent.data.name,".svg-container-cv","method");
			var split=d.parent.data.name.split(".");
			d3.select(".svg-container-pv").attr("lastSelected",d.parent.parent.data.name);
        		//HeaderUtils.setClassViewHeader("Class",split[split.length-1],d3.select(".svg-container-pv").attr("lastSelected"),this.root.data.name);
            HeaderUtils.headerUpdate('Class View', 'Class: ' + d.parent.data.name);
        		SVGUtils.resetView(".svg-container-pv")
        		NavUtils.updateSelectBoxText("packagesList",d.parent.parent.data.name);
			NavUtils.updateSelectBoxText("SelectViewBox","classView");

        	}else{
            		CircleUtils.highlightNode('.svg-container-sv', d.data.name);
            		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, '.svg-container-sv'));
            		HeaderUtils.headerUpdate('Package View', 'Package: ' + d.data.name);
          	}

        })
	.on("mouseover", (event,d) => {
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
