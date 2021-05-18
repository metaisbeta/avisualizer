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
  selector: 'system-view',
  templateUrl: './system-view.component.html',
  styleUrls: ['./system-view.component.css']
})
export class SystemViewComponent implements OnInit {
  private view;
  private schemasMap;
  private svg;
  private node;
  private root;
  private width = 960;
  private height = 960;
  private focus: any;
  private zoomProp: ZoomProp = {};
  private selectedNode: any;

  constructor() {
	this.node = null;
 this.root = null;
  }

  ngOnInit(): void {
    // read data from JSON
    d3.json('./assets/SpaceWeatherTSI-SV.json').then(data => this.readPackageView(data as any[]))
                                                .catch(error => console.log(error));
    //  d3.json('./assets/guj/Guj-SV.json').then(data => this.readPackageView(data as any[]))
    //   .catch(error => console.log(error));

     //d3.json('./assets/geostore/Geostore-SV.json').then(data => this.readPackageView(data as any[]))
     //  .catch(error => console.log(error));

     //d3.json("./assets/shopizer/Shopizer-SV.json").then(data => this.readPackageView(data as any[]))
     //  .c atch(error => console.log(error));
  }

  private readPackageView(data: any[]): void{

    this.root = d3.hierarchy(data);

    this.root.sum(d => d.value)
             .sort((a, b) =>  b.value - a.value);


    const pack = d3.pack()
      .size([this.width - 2, this.height - 10])
      .padding(3);

    pack(this.root);

    this.zoomProp.focus = this.root;

    // Fetch Annotations Schemas
    const anot = new AnnotationSchemas(this.root, 'locad');
    this.schemasMap = anot.getSchemasColorMap();
    const colorsMap = 	anot.getSchemasColorMap();
    
    
    // Create the SVG
    //console.log(this.root.descendants()[1].data.name)
    this.svg = SVGUtils.createSvg('.svg-container-sv', this.width, this.height, 'sistema');
    d3.select('.svg-container-sv').attr('lastSelected', String(this.root.descendants()[1].data.name));
    d3.select('.svg-container-sv').attr('rootName', this.root.children[0].data.name);

    // Create the nodes
    this.node = SVGUtils.createNode(this.svg, this.root);
    // Initial Zoom
    ZoomUtils.zoomTo([this.root.x, this.root.y, this.root.r * 2], this.svg, this.zoomProp, this.node);

    //Initial header setup
    HeaderUtils.setSystemViewHeader(this.root.data.name);
    HeaderUtils.headerUpdate('System View', 'Package: ' + this.root.children[0].data.name);
    HeaderUtils.setProjectName(this.root.data.name);

    // Color all circles

    d3.select('.svg-container-sv').selectAll('circle').attr('stroke', d => CircleUtils.addCircleStroke(d))
                          .attr('stroke-dasharray', d => CircleUtils.addCircleDashArray(d))

                            .attr('fill', d => CircleUtils.colorCircles(d, this.schemasMap));
    // Apply zoom to all circles in this specific view
    this.svg.selectAll('circle')
        .on('click', (event, d) => {
                d3.select('#packagesList').selectAll('option').each(function(e, i){
        		if (d3.select(this).attr('value') == d.parent.data.name && d.data.type == 'schema') {
        			return d3.select(this).property('selected', true);
        		}
        		else if (d3.select(this).attr('value') == d.data.name) {
        			return d3.select(this).property('selected', true);
 			}
        	});
        	       if (d.data.type == 'schema'){
        	       	NavUtils.updateSelectBoxText("SelectViewBox","packageView");
        			SVGUtils.hide('.svg-container-pv', d.parent.data.name);
				CircleUtils.highlightNode('.svg-container-sv', d.parent.data.name);
        		 this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.parent.data.name, '.svg-container-sv'));
        		 SVGUtils.showView('system-view', 'package-view');
        		 SVGUtils.viewTransition(String(d3.select('.svg-container-sv').attr('lastSelected')), '.svg-container-pv');
        		 //HeaderUtils.setPackageViewHeader('Package', d.parent.data.name, this.root.data.name);
             HeaderUtils.headerUpdate('Package View', 'Package: ' + d.parent.data.name);
             SVGUtils.resetView('.svg-container-sv');
        		 //console.log(d3.select('.svg-container-sv').attr('lastSelected'));
        	}else{
		      CircleUtils.highlightNode('.svg-container-sv', d.data.name);
		      this.zoomProp.focus !== d && (ZoomUtils.zoom(event, d, this.zoomProp, this.svg, this.node),	event.stopPropagation(), SVGUtils.setFocus(d.data.name, '.svg-container-sv'));
                   HeaderUtils.headerUpdate('System View', 'Package: ' + d.data.name);
        	       }

        })
	.on('mouseover', (event, d) =>{ 
		SVGUtils.createPopUp(d, this.svg, event);
		var name= d.data.name;
		//console.log(d.data)
		d3.select(".svg-container-sv").selectAll("circle").each(function(d,i){
			if(d3.select(this).attr("name")==name){
				var color = d3.select(this).style("fill");
				d3.select("tbody").selectAll("td").each(function(d,i){
					if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){
						
						d3.select(this).style("color",color)
					}
						
				});
			}

		});

	})
	.on('mouseout', (event, d) => {
		SVGUtils.destroyPopUp(this.svg);
		var name = d.data.name;
		d3.select(".svg-container-sv").selectAll("circle").each(function(d,i){
			if(d3.select(this).attr("name")==name){
				var color = d3.select(this).style("fill");
				d3.select("tbody").selectAll("td").each(function(d,i){
					if(d3.select(this).attr("class")=="td-schema" && d3.select(this).attr("name")==name){
						
						d3.select(this).style("color","black")
					}
						
				});
			}

		});
	})
	.on('mousemove', (event, d) => SVGUtils.movePopUp(d, this.svg, event))
	.on('contextmenu', (event, d) => {
            event.preventDefault();

        });
        
  //       NavUtils.createSelectBox("packages","packagesList","Select Package","select package","Package List",80,400,".svg-container-sv");
	// NavUtils.createSelectBox("classes","classList","Select Class","select class","Class List",200,400,".svg-container-pv");
	// NavUtils.createSelectBox("interfaces","interfaceList","Select Interface","select interface","Interface List",320,400,".svg-container-pv");
	// NavUtils.createSelectBox("methods","methodList","Select Method","select method","Method List",440,400,".svg-container-cv");
	// NavUtils.createSelectBox("fields","fieldList","Select Field","select field","Field List",560,400,".svg-container-cv");
  //
  //

  }


}






interface ZoomProp{
  [focus: string]: any;
}
