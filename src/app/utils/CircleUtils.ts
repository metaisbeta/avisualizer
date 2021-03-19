import * as d3 from "d3";
export class CircleUtils{

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
            return "#bdbdbd";
        else if(node.data.type =="annotation")
            return schemasMap.get(node.data.properties.schema);
		//return "url('#green-pattern')";
        else if(node.data.type =="schema")
            return schemasMap.get(node.data.name);
		//return "url('#green-pattern')";
        else if(node.data.type=="method")
 	    return "#969696";
 	else if(node.data.type=="field")
 	    return "#737373";
 	else if(node.data.type=="interface")
 	    return "#d9d9d9"; 	    	    	
        else if (node.data.type=="class")
           return "#525252";
       else    	
	    return "white";
    }
    public static highlightNode(container: any, name: string){
    console.log(d3.select(container).attr("highlightedNode"));
    						d3.select(container).selectAll("circle").each(function(d,i){
if(String(d3.select(this).attr("name"))==String(d3.select(container).attr("highlightedNode"))){
					console.log(d3.select(container).attr("highlightedNode"),d3.select(this).attr("name"));
    								d3.select(this).style("stroke","black");
    								d3.select(this).style("stroke-width","1px");
    								d3.select(this).style("fill","");	
    							}								
    						});
	            				d3.select(container).selectAll("circle").each(function(d,i){
		       
						if(String(d3.select(this).attr("name"))==name){
							 
							d3.select(container).attr("highlightedNode",String(d3.select(this).attr("name")));
							//console.log(d3.select(this).attr("name")+" "+id+" hide");
							d3.select(this).style("stroke","blue");
							d3.select(this).style("stroke-width","2px");
							d3.select(this).style("fill","blue");			
						}

		  			});
		  			

    	
    } 	

}
