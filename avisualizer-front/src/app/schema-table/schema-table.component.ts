import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import {SVGUtils} from '../utils/SVGUtils'
@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.css']
})
export class SchemaTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public static populateSchemasTable(annotationSchemas: AnnotationSchemas){
    //get the table with schemas
    const schema_table = d3.select("#schemas-table");
     var annotations =  annotationSchemas.getAnnotationsList();
     var counts = annotationSchemas.getAnnotationsCount();
     console.log(annotations)
    //populate table
    var rows = schema_table.select("tbody").selectAll("tr").
          data(annotationSchemas.getSchemasObjectArray()).enter().append("tr");
    rows.selectAll("td").append("td").text("\u25B2");
    var cells = rows.selectAll("td").data(function(row) {
      return ["schema","color"].map(function(column){
          return {column: column, value: row[column]};
      });
    }).enter().append("td")
    .attr("class", d => {
      if(String(d.value).includes("."))
        return "td-schema";
      else
        return "td-color";
    })
    .attr("name",d=>{return d.value;})   
    .attr("style", d => {
      if(String(d.value).includes("."))
        return "background-color:#FFFFFF";
      else
        return "background-color:"+d.value;
    })
    .text(d => {if(d.value.includes(".")) return "\u25BC"+d.value; else return "";})
    .on("dblclick",(event,d)=>{
    		event.preventDefault();
    		var name = d.value;
    		d3.select("tbody").selectAll("ul").each(function(d, i){
			if(d3.select(this).attr("name")==name){
				if(String(d3.select(this).style("display"))=="block"){
					d3.select(this).style("display","none");
					
					
				}	
				else{
					d3.select(this).style("display","block");
							
				}
			}
		});

    				
					
    	});
    		
    	d3.select("tbody").selectAll("td").each(function(d, i){
                if (String(d3.select(this).attr('name')).includes(".")){
                	var schema = String(d3.select(this).attr('name'));
                	var names = annotations.get(String(d3.select(this).attr('name')));
			for(var n in names){
				names[n]=names[n]+" ";
			
			}
			
			var ul = d3.select(this).append('ul').attr("name",String(d3.select(this).attr('name'))).style("display","none");
			for(var e in names){
				ul.append("li").html(names[e]+" ("+counts.get(names[e].replace(" ",""))+") ").attr("id",names[e]).attr("schema",schema)
			}

                       
		}

	});
	d3.select("tbody").selectAll("ul").each(function(d,i){
		d3.select(this).selectAll("li").each(function(e,j){
			var nome = d3.select(this).attr("id");
			var schema = d3.select(this).attr("schema");
			d3.select(this).append("input")
       	 				        .attr('type','checkbox')
       	 				        .attr("id",String(nome))
       	 				        .attr("schema",schema)
       	 				        .property('checked',true)
       	 				        .on("click",function(d){
       	 				        		var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
       	 				        		var boxSchema = d3.select(this).attr("schema");
       	 				        		var checked = false;
       	 				        		d3.select("tbody").selectAll("ul").each(function(d,i){
       	 				        			if(d3.select(this).attr("name")==boxSchema){
       	 				        				d3.select(this).selectAll("li").each(function(e,j){
       	 				        					if(d3.select(this).select("input").property("checked")){
       	 				        						checked=true;
       	 				        					}
       	 				        				});
       	 				        			}
       	 				        		});
        								SVGUtils.hideCircles(container,this.id.replace(" ",""),this.checked);
									        d3.select("tbody").selectAll("input").each(function(d,i){
											if(d3.select(this).attr("class")=="parent" && d3.select(this).attr("id")==boxSchema)
												d3.select(this).property("checked",checked)
										});
       	 				        	
       	 				        });
		});
	});
    
    //column for total annotations of each schema
    rows.append("td").text(function(d,i){
		return annotationSchemas.schemasTotalAnnotations.get(annotationSchemas.getSchemasObjectArray()[i].schema)
    });
    //column with checkboxes
    rows.append("input").property('checked',true)
       .attr('type','checkbox')
       .attr("class","parent")
       .attr("id",function(d,i){   return annotationSchemas.getSchemasObjectArray()[i].schema})
       .on("click",function(d){
	//console.log(d3.select("system-view").attr("hidden"),d3.select("package-view").attr("hidden"),d3.select("class-view").attr("hidden"))
	var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
        SVGUtils.hideCircles(container,this.id,this.checked);
        var checked = d3.select(this).property("checked")
        var boxName = d3.select(this).attr("id")
        d3.select("tbody").selectAll("ul").each(function(d,i){
        	if(d3.select(this).attr("name")==boxName){
        		d3.select(this).selectAll("input").each(function(e,j){
        			d3.select(this).property("checked",checked);
        		});
        	}
        });
        d3.select("#UnselectAllBox").property("checked",false);		
	});

d3.select("#schemas-table").select("tbody").append("tr").attr("id","selectAllRow").append("td").text("Select All");
      d3.select("#selectAllRow").append("td").text(" ");
      d3.select("#selectAllRow").append("td").text(" ");
      d3.select("#selectAllRow").append("input").property('checked',true)
       .attr('type','checkbox')
       .attr("id","selectAllBox")
       .on("click",function(d){
   		var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
       	SVGUtils.hideCircles(container,d3.select("#selectAllRow").attr("id"),this.checked);
       	d3.select("#schemas-table").selectAll("input").each(function(d,i){
       		if(d3.select(this).attr("id")!="UnselectAllBox")
       			d3.select(this).property("checked",true);
       		else
       			d3.select(this).property("checked",false);	
       	});
       });
      d3.select("#schemas-table").select("tbody").append("tr").attr("id","UnselectAllRow").append("td").text("Remove All");
      d3.select("#UnselectAllRow").append("td").text(" ");
      d3.select("#UnselectAllRow").append("td").text(" ");
      d3.select("#UnselectAllRow").append("input").property('checked',false)
       .attr('type','checkbox')
       .attr("id","UnselectAllBox")
       .on("click",function(d){
       	
		var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
       	
       		
       		SVGUtils.hideCircles(container,d3.select("#UnselectAllRow").attr("id"),false);

       	d3.select("#schemas-table").selectAll("input").each(function(d,i){
       		if(d3.select(this).attr("id")!="UnselectAllBox")
       			d3.select(this).property("checked",false);
       		else
       			d3.select(this).property("checked",true);		
       	});
      	
       });




    }
}
