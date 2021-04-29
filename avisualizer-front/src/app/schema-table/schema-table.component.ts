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
      
    //populate table
    var rows = schema_table.select("tbody").selectAll("tr").
          data(annotationSchemas.getSchemasObjectArray()).enter().append("tr");
     
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
    .attr("style", d => {
      if(String(d.value).includes("."))
        return "background-color:#FFFFFF";
      else
        return "background-color:"+d.value;
    })
    .text(d => {if(d.value.includes(".")) return d.value; else return "";});
    
    //column for total annotations of each schema
    rows.append("td").text(function(d,i){
		return annotationSchemas.schemasTotalAnnotations.get(annotationSchemas.getSchemasObjectArray()[i].schema)
    });
    //column with checkboxes
    rows.append("input").property('checked',true)
       .attr('type','checkbox')
       .attr("id",function(d,i){   return annotationSchemas.getSchemasObjectArray()[i].schema})
       .on("click",function(d){
	//console.log(d3.select("system-view").attr("hidden"),d3.select("package-view").attr("hidden"),d3.select("class-view").attr("hidden"))
	var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
        SVGUtils.hideCircles(container,this.id,this.checked);
        d3.select("#UnselectAllBox").property("checked",false);		
	});

d3.select("#schemas-table").select("tbody").append("tr").attr("id","selectAllRow").append("td").text("Select All");
      d3.select("#selectAllRow").append("td").text(" ");
      d3.select("#selectAllRow").append("td").text(" ");
      d3.select("#selectAllRow").append("input").property('checked',true)
       .attr('type','checkbox')
       .attr("id","selectAllBox")
       .on("click",(event, d) =>{
   		var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
       	if(container=="systemView"){
       		
       		SVGUtils.displayAllCircles(".svg-container-sv");
       	}else if (container=="packageView"){
       		console.log("package view")
       		SVGUtils.displayAllCircles(".svg-container-pv");
       	}else{
       		SVGUtils.displayAllCircles(".svg-container-cv");
       	}
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
       .on("click",(event, d) =>{
       	
		var container = String(d3.select("#SelectViewBox").select("select option:checked").attr("value"));
       	if(container=="systemView"){
       		
       		SVGUtils.hideAllCircles(".svg-container-sv");
       	}else if (container=="packageView"){
       		SVGUtils.hideAllCircles(".svg-container-pv");
       	}else{
       		SVGUtils.hideAllCircles(".svg-container-cv");
       	}
       	d3.select("#schemas-table").selectAll("input").each(function(d,i){
       		if(d3.select(this).attr("id")!="UnselectAllBox")
       			d3.select(this).property("checked",false);
       		else
       			d3.select(this).property("checked",true);		
       	});
      	
       });
	



    }
}
