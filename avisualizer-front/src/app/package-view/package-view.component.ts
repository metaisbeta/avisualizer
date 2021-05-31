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
     
    //d3.json(this.path[0]).then(data => this.readPackageView(data as any[]))
     //                                          .catch(error => console.log(error));
       	         //d3.select("#SelectViewBox").append("select").attr("id","projectSelectBox").append("option").text("SpaceWeather").attr("value",0);
         //d3.select("#projectSelectBox").append("option").text("Guj").attr("value",1);
         //d3.select("#projectSelectBox").append("option").text("Geostore").attr("value",2);
         //d3.select("#projectSelectBox").on("change",(d,event)=>{
         		//d3.select("tbody").selectAll("*").remove();
         		//var value = d3.select("#projectSelectBox option:checked").attr("value");
         		//d3.select(".svg-container-sv").attr('hidden', null);
		       // d3.select(".svg-container-sv").selectAll("*").remove();
		        // d3.select(".svg-container-pv").selectAll("*").remove();
		        //  d3.select(".svg-container-cv").selectAll("*").remove();
		          
         		//d3.json(this.path[value]).then(data => this.readPackageView(data as any[]))
                                              //  .catch(error => console.log(error));
                                              // let test = new SystemViewComponent();
                                              // let test1 = new ClassViewComponent();
                                            	
						//d3.select("class-view").attr("hidden",'');
						//d3.select("package-view").attr("hidden",'');
						//d3.select("system-view").attr("hidden",null);
						//NavUtils.updateSelectBoxText("SelectViewBox","systemView");
						
                                               // });
                                               
                                             
//button upload-------------------------------
//                     d3.select("#SelectViewBox").append("input").attr("type","file").attr("id","upload").attr("name","filename");
//                      d3.select("#SelectViewBox").append("input").attr("type","submit")
//                      					.on("click",(event,d)=>{
//                      						var files = d3.select("#upload").property("value").split("\\");
//                      						var file = files[files.length-1];
//                      						var dir = files[files.length-1].split("-");
//                      						var  folder = dir[0].toLowerCase();
//                      						
//                      						d3.select("tbody").selectAll("*").remove();
//								
//         		//var value = d3.select("#projectSelectBox option:checked").attr("value");
//         		d3.select(".svg-container-sv").attr('hidden', null);
//		        d3.select(".svg-container-sv").selectAll("*").remove();
//		         d3.select(".svg-container-pv").selectAll("*").remove();
//		          d3.select(".svg-container-cv").selectAll("*").remove();
//		          
//         		//d3.json(this.path[value]).then(data => this.readPackageView(data as any[]))
//                       //                        .catch(error => console.log(error));
//                       d3.json("./assets/"+folder+"/"+dir[0]+"-PV.json").then(data => this.readPackageView(data as any[]))
//                                               .catch(error => console.log(error));
//                                               //let test = new SystemViewComponent();
//                                               //let test1 = new ClassViewComponent();
//                                            	
//                                            	 let test = new SystemViewComponent();
//                                               let test1 = new ClassViewComponent();
//						d3.select("class-view").attr("hidden",'');
//						d3.select("package-view").attr("hidden",'');
//						d3.select("system-view").attr("hidden",null);
//						NavUtils.updateSelectBoxText("SelectViewBox","systemView");
//						
//                      					});   

//Load other sample projects                        
    //  d3.json("./assets/guj/Guj-PV.json").then(data => this.readPackageView(data as any[]))
    //   .catch(error => console.log(error));

    //
    // d3.json("./assets/geostore/Geostore-PV.json").then(data => this.readPackageView(data as any[]))
     //  .catch(error => console.log(error));

     //d3.json("./assets/shopizer/Shopizer-PV.json").then(data => this.readPackageView(data as any[]))
      // .catch(error => console.log(error));
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
//findObjectByLabel(cars, "Ford");
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


    this.node = SVGUtils.createNode(this.svg, this.root);
    //Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2],this.svg, this.zoomProp,this.node);
	d3.select(".svg-container-pv")
		.on("click",(event,d)=>{
			SVGUtils.showView('package-view', 'system-view');
		})
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
            	console.log(d.data.name,"here?")
		       if(d.data.name==this.root.descendants()[1].data.name){
		       	var node = d.descendants()[0].data.children[0].name;
		       	
		       	d3.select(".svg-container-pv").selectAll('circle').each(function(d, i){
					if (String(d3.select(this).attr('name')) == node){
						
						d3.select(this).dispatch('click');
						
						return this;
					}

				});
				d3.select(".svg-container-sv").attr("lastSelected",node);
		       }else{
		       console.log(d.data.name,"here??")
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
          		console.log("h?ere?")
        		//HeaderUtils.setPackageViewHeader("Package",d.parent.data.name,this.root.data.name);
            HeaderUtils.headerUpdate('Package View', d.data.type.charAt(0).toUpperCase() + d.data.type.slice(1) +  ': ' + d.data.name);
        		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d,this.zoomProp,this.svg,this.node), event.stopPropagation(),SVGUtils.setFocus(d.parent.data.name,".svg-container-pv"))
        		if(d.data.type=="class")
        			NavUtils.updateSelectBoxText("classList",d.data.name);
        		else
        			NavUtils.updateSelectBoxText("interfaceList",d.data.name);
                       CircleUtils.highlightNode(".svg-container-pv",d.data.name);

        	}else if(d.data.type=="package" && !d3.select(".svg-container-sv").attr("lastSelected").includes(d.parent.data.name)){
        		console.log("herea?")
			//HeaderUtils.setSystemViewHeader(this.root.data.name);
            		HeaderUtils.headerUpdate('System View', 'Package: ' + d.data.name);
            		NavUtils.updateSelectBoxText("SelectViewBox","systemView");
 			SVGUtils.showView("package-view","system-view");
			NavUtils.resetBox("interfaceList","interfaces","Select Interface","select interface");
			NavUtils.resetBox("classList","classes","Select Class","select class");
			NavUtils.updateSelectBoxText("packagesList",d.data.name);
			d3.select(".svg-container-pv").attr("lastSelected",d.data.name)
        	}else if(d.data.type=="annotation"){
        		d3.select(".svg-container-cv").selectAll("*").remove();
        			console.log(this.classViewData)
        	       	this.classView = new ClassViewComponent(this.http);
        	       	this.classView.readPackageView(this.classViewData as any[],d.parent.data.name,0,"")
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
        		console.log("???")
//            		CircleUtils.highlightNode('.svg-container-sv', d.data.name);
//            		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, '.svg-container-sv'));
//            		HeaderUtils.headerUpdate('Package View', 'Package: ' + d.data.name);
		        CircleUtils.highlightNode('.svg-container-sv', d.data.name);
            		this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, '.svg-container-sv'));
            		HeaderUtils.headerUpdate('System View', 'Package: ' + d.data.name);
            		SVGUtils.showView("package-view","system-view");
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
