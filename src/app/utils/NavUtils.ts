import * as d3 from "d3";
import { svg } from "d3";
export class NavUtils{
  
  
    public static getPackagesName(svg:any): string[]{
        var names = [];
    	svg.selectAll("circle").each(d=>{
    		if(d.data.type=="package" && d.data.children.length>0){
    			names.push(d.data.name);
    			
    		}
    			
    	});
    	return names;
    }
    public static getClassName(svg:any, pacote:string): string[]{
        var names = [];
    	svg.selectAll("circle").each(d=>{
    		
    		if(d.data.type=="class" && d.data.children.length>0){
    			//var split =d.data.name.split("."); 
    			if(d.parent.data.name==pacote)
    				names.push(d.data.name);
    			
    		}
    			
    	});   	
    	return names;
    }
    public static getElementName(svg:any, classe:string,element:string): string[]{
        var names = [];
    	svg.selectAll("circle").each(d=>{
    		
    		if(d.data.type==element){
    			//var split =d.data.name.split("."); 
    			if(d.parent.data.name==classe)
    				names.push(d.data.name);
    			
    		}
    			
    	});   	
    	return names;
    }

    public static createSelectBox(divName:string,selectBoxId:string,defaultBoxText:string,defaultBoxValue:string,label:string,top:number,width:number,svg:string){
    	d3.select("body")
            .append("div")
            .attr("id",divName)
            .attr("class", "nav-bar")
            .style("position","fixed")
            .style("left",0+ "px")
            .style("top",top+ "px")
            .style("background-color","#fff")
            .style("width",400)
            .style("overflow","auto")
            .append("h5").html(label +" <br/>")
            .append("select").attr("id",selectBoxId).attr("label",label).style("width","400px");
            d3.select("#"+divName).select("select").append("option").text(defaultBoxText).attr("value",defaultBoxText);
    	    if(svg==".svg-container-sv"){
    	    	var options = NavUtils.getPackagesName(d3.select(svg));
    	    	console.log(options);
    	    	NavUtils.insertOptions(".svg-container-sv",divName,selectBoxId,options);

    	    }
    	    d3.select("#"+selectBoxId).on("change",(d,event)=>{
    	    	console.log(selectBoxId,divName,svg);			
		d3.select(svg).selectAll("circle").each(function(d,i){
				if(d3.select(this).attr("name")==d3.select("#"+divName).select("select option:checked").attr("value")){ 
					d3.select(this).dispatch("click");
					console.log(divName);	
				}		
			});		
	    });	
    }	
    
    public static insertOptions(svg:string,div:string,boxId:string,options:string[]){
    		options.sort();
    		if(svg==".svg-container-sv" || svg==".svg-container-cv"){
 		    for(var i=0;i<options.length;i++){
            		d3.select("#"+div).select("select").append("option")
           			.text(options[i])
                     		.attr("value",options[i]);
            		             			    
        	    }    		
    		}else{
  		    for(var i=0;i<options.length;i++){
  		    	var text = options[i].split(".");
            		d3.select("#"+div).select("select").append("option")
           			.text(text[text.length-1])
                     		.attr("value",options[i]);
            		             			    
        	    }     		
    	        }		
   
    }
  

}
