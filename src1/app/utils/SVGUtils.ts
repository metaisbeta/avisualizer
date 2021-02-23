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
        .attr("schema",function(d){ d.data.type =="annotation" ? console.log(d.data.properties.schema) : console.log("error"); return  d.data.type =="annotation" ? d.data.properties.schema : d.data.type })
        // //.attr("pointer-events", d => !d.children ? "none" : null)
        // .on("mouseover", function(event, d) {	
        //     //Creating the label
        //     divTooltip.transition()		
        //         .duration(200)		
        //         .style("opacity", .9);
        //     divTooltip.html(buildTooltip(d) + "<br/>")	
        //         .style("left", (event.pageX) + "px")		
        //         .style("top", (event.pageY - 28) + "px");

        //     //highlight the node
        //     //const circle = svg.select("g").append("circle").attr("r",d.r).attr("fill", "red").attr("cx",this.attr("cx")).attr("cy",this.attr("cy"));
        //     console.log(event);
        //     console.log(d);  
        //     console.log(this);

        //   })
        //   .on("mouseout", function() { 
        //     divTooltip.transition()		
        //         .duration(500)		
        //         .style("opacity", 0);
            
        //     //unhighlight the node
        //   })
        //.on("click", (event, d) => focus !== d && (this.zoom(event, d), event.stopPropagation()));

    // this.zoomTo([this.root.x, this.root.y, this.root.r * 2]);

    // d3.selectAll("circle").attr("stroke", d => this.addCircleStroke(d))
    //                       .attr("stroke-dasharray", d=> this.addCircleDashArray(d))
    //                       .attr("fill", d => this.colorCircles(d));
    return node;
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
    public static resetSystemView(){
	var view = d3.selectAll(".svg-container-sv").select("svg");
        view.selectAll("circle").each(function(d,i){
			d3.select(this).style("visibility","visible");						
	});
        d3.selectAll("input").property('checked',true);
   }
    public static resetPackageView(){
	var view = d3.selectAll(".svg-container-pv").select("svg");
        view.selectAll("circle").each(function(d,i){
			d3.select(this).style("visibility","visible");						
	});
        d3.selectAll("input").property('checked',true);
   }
}
