import * as d3 from "d3";
import { svg } from "d3";


export class SVGUtils{
     
    constructor() {}
    
    public static createSvg(svgContainer: string, width: number, height: number, nome: string): any{
        const svg = d3.select(svgContainer)
        .append("svg")
        .attr("viewBox", `-${width / 2} -${(height / 2)} ${width} ${height}`)
        .attr("width",width)
        .attr("height",height)
        .attr("name",nome)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", "lightblue")
        .style("cursor", "pointer")
        
        //.on("click", (event) => this.zoom(event, this.root));


        return svg;
    }

    public static createNode(svg: any, root: any){

        const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("class", d => {
            return d.data.type;
        })
        .attr("name",function(d){ return d.data.name})
        .attr("schema",function(d){  return  d.data.type =="annotation" ? d.data.properties.schema : d.data.type })
        .attr("zoom","a")
	
    	 
    return node;
    }
    public static viewTransition(origin,view){
        
        d3.select(String(view)).selectAll("circle").each(function(d,i){
                if(String(d3.select(this).attr("name"))==origin){
                        d3.select(this).dispatch("click");
						
			return this;
		} 
			
	});
	
    }
    public static setFocus(toZoom,view){
                
        d3.select(String(view)).attr("lastSelected",String(toZoom));
	console.log(view,d3.select(String(view)).attr("lastSelected")); 
    }	

    
    public static hideCircles(id: String,show: boolean){
          if(d3.selectAll("system-view").attr("hidden")!==""){
	  	  var view = d3.selectAll(".svg-container-sv").select("svg");
		  view.selectAll("circle").each(function(d,i){
		       
			if(String(d3.select(this).attr("name"))==id){ //schema se for package name se for system
				if(!show){
		                        //console.log(d3.select(this).attr("name")+" "+id);
					d3.select(this).style("visibility","hidden");			
				}else{
					//console.log(d3.select(this).attr("name")+" "+id+" hide");
					d3.select(this).style("visibility","visible");			
				}

			}
				
		  }); 
	  }else{
	  	  var view = d3.selectAll(".svg-container-pv").select("svg");
		  view.selectAll("circle").each(function(d,i){
		       
			if(String(d3.select(this).attr("schema"))==id){ //schema se for package name se for system
				if(!show){
		                        //console.log(d3.select(this).attr("name")+" "+id);
					d3.select(this).style("visibility","hidden");			
				}else{
					//console.log(d3.select(this).attr("name")+" "+id+" hide");
					d3.select(this).style("visibility","visible");			
				}

			}
				
		  });
	  }
		
	
          


    }

    
    public static resetView(viewToUpdate){
	var view = d3.selectAll(String(viewToUpdate)).select("svg");
        view.selectAll("circle").each(function(d,i){
			d3.select(this).style("visibility","visible");						
	});
        d3.selectAll("input").property('checked',true);
   }


    public static createPopUp(d: any, svg: any, event: any){
        if(d.data.type=="schema"){
		const divTooltip = d3.select("body").append("div")	
    			.attr("class", "tooltip") 				
    		        .style("opacity", 1)
		       	.style("left", (event.pageX) + "px")		
        		.style("top", (event.pageY - 70) + "px")
			.style("background","#BCC5F7")
			.html("Schema Name: "+d.data.name+"<br/>"+"Package Name "+d.parent.data.name+"<br/>"+"Number of Annotations: "+d.data.size)
		        .transition()		
        		.duration(200);		
        	
       }else if(d.data.type=="annotation"){
                var classname=d.parent.data.name.split(".");
                 
		const divTooltip = d3.select("body").append("div")	
    			.attr("class", "tooltip") 				
    		        .style("opacity", 1)
		       	.style("left", (event.pageX +10) + "px")		
        		.style("top", (event.pageY - 60) + "px")
			.style("background","#BCC5F7")
			.html("Package Name: "+d.parent.parent.data.name+"<br/>"+"Class Name "+classname[classname.length-1]+"<br/>"+"Annotation name: "+d.data.name+"<br/>"+"AA: "+d.data.value)
		        .transition()		
        		.duration(200);		
        
       }	
 	
    }
    
    public static destroyPopUp(svg: any){
	d3.selectAll(".tooltip").remove();
    }  
    public static movePopUp(d: any, svg: any, event: any){
	SVGUtils.destroyPopUp(svg);
	SVGUtils.createPopUp(d,svg,event);	
    }	



}
