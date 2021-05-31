import * as d3 from "d3";
export class CircleUtils{

    static transitionDur = 150;

    constructor(){}

    public static addCircleStroke(node): string{
        if(node.data.type=="package")
            return "black";
        else
            return "blue";
      }

    public static addCircleDashArray(node): string{
        if(node.data.type=="package")
            return "5,5";
        else
            return null;
    }

    public static colorCircles(node: any, schemasMap: Map<any,any>): string{
        if(node.data.type=="package")
            return "#e0dada";
        else if(node.data.type =="annotation")
            return schemasMap.get(node.data.properties.schema);
		//return "url('#green-pattern')";
        else if(node.data.type =="schema")
            return schemasMap.get(node.data.name);
		//return "url('#green-pattern')";
        else if(node.data.type=="method")
 	    return "#D2D2D2";
 	else if(node.data.type=="field")
 	    return "#e3e3e3";

       else
	    return "white";
    }
    public static highlightNode(container: any, name: string){

    						d3.select(container).selectAll("circle").each(function(d,i){
    						//var splitter = String(d3.select(this).attr("name").split(".");
if(String(d3.select(this).attr("name"))==String(d3.select(container).attr("highlightedNode"))){
								if(d3.select(this).attr("class")=="package")
    									d3.select(this).style("stroke","black");
    								else
    								d3.select(this).style("stroke","blue");
    								d3.select(this).style("stroke-width","1px");
    								d3.select(this).style("fill","");
    							}

    						});
	            				d3.select(container).selectAll("circle").each(function(d,i){

						if(String(d3.select(this).attr("name"))==name){

							d3.select(container).attr("highlightedNode",String(d3.select(this).attr("name")));

							d3.select(this).style("stroke","blue");
							d3.select(this).style("stroke-width","2px");
							var color = d3.select(this).style("fill");
							d3.select(this).transition()
  									.duration(CircleUtils.transitionDur)
  									.style("fill","gray")
									.transition()
  									.duration(CircleUtils.transitionDur)
  									.style("fill",String(d3.color(color).formatHex()));

							if(d3.select(this).attr("class")=="package")
								d3.select(this).style("stroke","black");
							else
								d3.select(this).style("stroke","blue");
							d3.select(this).style("stroke-width","1px");
							
						}

		  			});



    }

}
