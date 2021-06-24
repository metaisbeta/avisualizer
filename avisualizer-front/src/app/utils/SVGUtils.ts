import * as d3 from 'd3';
import { svg } from 'd3';


export class SVGUtils{

    static pvPropertiesSize = 1;
    static popUpTransition = 200;

    constructor() {}

    public static createSvg(svgContainer: string, width: number, height: number, nome: string): any{
        const svg = d3.select(svgContainer)
        .append('svg')
        .attr('viewBox', `-${width / 2} -${(height / 2)} ${width} ${height}`)
        .attr('width', width)
        .attr('height', height)
        .attr('name', nome)
        .attr('highlightedNode', '')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .style('display', 'block')
        .style('margin', '0 -14px')
        .style('background', 'lightblue')
        .style('cursor', 'pointer');

        // .on("click", (event) => this.zoom(event, this.root));

        return svg;
    }

    public static createNode(svg: any, root: any){

        const node = svg.append('g')
        .selectAll('circle')
        .data(root.descendants())
        .join('circle')
        .attr('class', d => {
            return d.data.type;
        })
        .attr('name', function(d){ return d.data.name; })
        .attr('schema', function(d){  return  d.data.type == 'annotation' ? d.data.properties.schema : d.data.type; })
        .attr('zoom', 'a')
        .attr('value', function(d){  return  d.data.type == 'schema' ? d.data.value : 0; })
	.attr('parent', d => d.parent == null ? '' : d.parent.data.name)
    	.attr('grandfather', d => {
    		if (d.parent == null) {
    			return '';
    		}
    		else if (d.parent.parent == null) {
    			return '';
 }
    		else{

    			return d.parent.parent.data.name;
    		}

    	})
    	.attr('grandgrandfather', d => {
    		if (d.parent == null) {
    			return '';
    		}
    		else if (d.parent.parent == null) {
    			return '';
 }
    		else if (d.parent.parent.parent == null) {
    			return '';

    		}else {
    			return d.parent.parent.parent.data.name;
 }

    	});
        return node;
    }

    
    public static showView(origin: string, view: string){
    	d3.select(view).attr('hidden', null);
    	d3.select(origin).attr('hidden', '');
    }
    // view related methods
    public static viewTransition(origin, view){
	//console.log(origin,view)
        d3.select(String(view)).selectAll('circle').each(function(d, i){
                if (String(d3.select(this).attr('name')) == origin){
                	//console.log(d3.select(this).attr('name'))
                       //d3.select(this).dispatch('click');
			                    SVGUtils.setFocus(origin, view);
			                    return this;
		}

	});

    }
    public static setFocus(toZoom, view){

        d3.select(String(view)).attr('lastSelected', String(toZoom));

    }



    public static hideCircles(container: string, id: String, show: boolean){
	if(container=="systemView"){
		container = ".svg-container-sv"  		 	
	}else if (container=="packageView"){
		container=".svg-container-pv"
	}else{
		container = ".svg-container-cv"
	}
	console.log(container,id,show)
	d3.select(container).selectAll('circle').each(function(d, i){
	
		if ((String(d3.select(this).attr('name')) == id || String(d3.select(this).attr('schema')) == id)){ 
			if (!show){
				d3.select(this).style('visibility', 'hidden');
			}else{
				d3.select(this).style('visibility', 'visible');
			}

		}else if(id=="UnselectAllRow" || id=="selectAllRow"){
			if(String(d3.select(this).attr('class'))=="annotation" || String(d3.select(this).attr('class'))=="schema"){
				if (!show){
					d3.select(this).style('visibility', 'hidden');
				}else{
					d3.select(this).style('visibility', 'visible');
				}
			}
		}

	});	

    }

    // popUp methods
    public static createPopUp(d: any, svg: any, event: any){
        if (d.data.type == 'schema'){// system view
		const divTooltip = d3.select('body').append('div')
    			.attr('class', 'tooltip')
    		        .style('opacity', 1)
		       	.style('left', (event.pageX) + 'px')
        		.style('top', (event.pageY - 70) + 'px')
			.style('background', '#BCC5F7')
			.html('Schema Name: ' + d.data.name + '<br/>' + 'Package Name ' + d.parent.data.name + '<br/>' + 'Number of Annotation occurrence: ' + d.data.value)
		        .transition()
        		.duration(this.popUpTransition);

       }else if (d.data.type === 'annotation' && (d.parent.data.type === 'class' || d.parent.data.type === 'interface')){// type definition label (interface/class)
                const classname = d.parent.data.name.split('.');
                let label = 'Package Name: ' + d3.select(".svg-container-pv").attr("lastSelected") + '<br/>' +
                              'Class Name: ' + classname[classname.length - 1] + '<br/>'  +
                              'Annotation name: ' + d.data.name + '<br/>';

                //if(Object.keys(d.data.properties).length === this.pvPropertiesSize){
               //   label = label.concat('LOCAD: ' + d.data.value); //in package view, the metrics is LOCAD
                //}else{
                 // label = label.concat('AA: ' + d.data.properties.aa); //in class view, the metric is AA
                //}
                let metrics = d3.select("#annotMetric").text().split(" ");
                let metric="";
                let data;
                console.log(metrics[metrics.length-1])
                if(metrics[metrics.length-1]=="(ANL)"){
                	metric = 'ANL';
                	
                	data = d.data.properties.anl;
                	label = label.concat(metric+" "+data);
                }else if(metrics[metrics.length-1]=="(LOCAD)"){
                	metric = 'LOCAD';
                	if(Object.keys(d.data.properties).length === this.pvPropertiesSize){
                		data = d.data.value;
                	}else
                		data = d.data.properties.locad; 
                	label = label.concat(metric+" "+data);               	
                }else{
                	metric = 'AA';
                	data = d.data.properties.aa; 
                	label = label.concat(metric+" "+data);                 
                }

                const divTooltip = d3.select('body').append('div')
    			        .attr('class', 'tooltip')
    		          .style('opacity', 1)
		       	      .style('left', (event.pageX + 30) + 'px')
        		      .style('top', (event.pageY - 60) + 'px')
			            .style('background', '#BCC5F7')
			            .html(label)
                  .transition()
        		      .duration(this.popUpTransition);

       }else if (d.data.type == 'annotation' && ((d.parent.data.type == 'field' || d.parent.data.type == 'method'))){
                let componentname = d.parent.data.name.split('.');
                let classname =  d.parent.parent.data.name.split('.');
                let metrics = d3.select("#annotMetric").text().split(" ");
                let metric="";
                let data;
                console.log(metrics[metrics.length-1])
                if(metrics[metrics.length-1]=="(ANL)"){
                	metric = 'ANL';
                	data = d.data.properties.anl;
                	
                }else if(metrics[metrics.length-1]=="(LOCAD)"){
                	metric = 'LOCAD';
                	data = d.data.properties.locad;                	
                }else{
                	metric = 'AA';
                	data = d.data.properties.aa;                  
                }

                
		              const divTooltip = d3.select('body').append('div')
    			            .attr('class', 'tooltip')
                      .style('opacity', 1)
		       	.style('left', (event.pageX + 10) + 'px')
        		.style('top', (event.pageY - 60) + 'px')
			.style('background', '#BCC5F7')
			.html('Package Name: ' + d3.select(".svg-container-pv").attr("lastSelected") + '<br/>' + 'Class Name: ' + classname[classname.length - 1] + '<br/>' + d.parent.data.type + ' Name ' + componentname[componentname.length - 1] + '<br/>' + 'Annotation name: ' + d.data.name + '<br/>' + metric+": "+ data)
		        .transition()
        		.duration(this.popUpTransition);

       }else if (d.data.type == 'class' || d.data.type == 'interface'){

                let classname =  d.data.name.split('.');
		              const divTooltip = d3.select('body').append('div')
    			.attr('class', 'tooltip')
    		        .style('opacity', 1)
		       .style('left', (event.pageX + 10) + 'px')
        		.style('top', (event.pageY - 60) + 'px')
			.style('background', '#BCC5F7')
			.html( d.data.type + ' Name: ' + classname[classname.length - 1] + '<br/>')
		        .transition()
        		.duration(this.popUpTransition);
       }

    }

    public static destroyPopUp(svg: any){
	d3.selectAll('.tooltip').remove();
    }
    public static movePopUp(d: any, svg: any, event: any){
	SVGUtils.destroyPopUp(svg);
	SVGUtils.createPopUp(d, svg, event);
    }




}
