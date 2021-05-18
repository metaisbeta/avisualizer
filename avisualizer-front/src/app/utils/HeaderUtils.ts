import * as d3 from 'd3';
import { svg } from 'd3';

export class HeaderUtils{

	public static setSystemViewHeader(root: string){
		HeaderUtils.packageInfoUpdate('');
		HeaderUtils.classInfoUpdate('');
		HeaderUtils.elementInfoUpdate('');
		HeaderUtils.viewInfoUpdate('System');
		let title = d3.select('#header').attr('view') + ' View' + ': Project ' + String(root) + '/';
  d3.select('#header').select('h2').text(title);
	}
	public static setPackageViewHeader(view: string, pacote: string, root: string){
		HeaderUtils.packageInfoUpdate(pacote);

		HeaderUtils.viewInfoUpdate(view);
		let title = d3.select('#header').attr('view') + ' View' + ': Project ' + String(root) + '/' + d3.select('#header').attr('package') + '/';
  d3.select('#header').select('h2').text(title);
	}
	public static setClassViewHeader(view: string, classe: string, pacote: string, root: string){
		HeaderUtils.classInfoUpdate(classe);
		HeaderUtils.viewInfoUpdate(view);
		HeaderUtils.packageInfoUpdate(pacote);
		let title = d3.select('#header').attr('view') + ' View' + ': Project ' + String(root) + '/' + d3.select('#header').attr('package') + '/' + d3.select('#header').attr('class') + '/';
  d3.select('#header').select('h2').text(title);
	}

	public static viewInfoUpdate(view: string){
    // tslint:disable-next-line:indent
		d3.select('#header').attr('view', view);
	}
  	public static packageInfoUpdate(pacote: string){
		d3.select('#header').attr('package', pacote);
	}
	public static classInfoUpdate(classe: string){
		d3.select('#header').attr('class', classe);
	}
	public static elementInfoUpdate(element: string){
		d3.select('#header').attr('element', element);
	}

  public static headerUpdate(viewName: string, elementInfo: string){

	  let annotMetric = 'Annotation Metric: ';
		console.log(viewName)
	  if(viewName === 'System View') {
      annotMetric = annotMetric.concat('Number of Annotations');
    } else if (viewName === 'Package View'){
      annotMetric = annotMetric.concat('LOC in Annotation Declaration (LOCAD)');
    }else{
      annotMetric = annotMetric.concat('Arguments in Annotations (AA)');
    }
	  d3.select('#viewName').text(viewName);
    var color = d3.select('#elementInfo').style("fill");
    
    d3.select('#elementInfo').text(elementInfo);
    d3.select('#elementInfo').
             transition().duration(100).style('fill','white')
             //.transition().duration(100).style('fill',d3.color(color).formatHex());
             .transition().duration(100).style('fill',d3.color(color).formatHex());
    d3.select('#annotMetric').text(annotMetric);
  }
   public static metricInfoUpdate(metric:string){
   	if(metric=="aa"){
   		var metricName = "Annotation Metric: Arguments in Annotation (AA)"
   	}else if(metric=="locad"){
   		var metricName= "Annotation Metric: LOC in Annotation Declaration (LOCAD)";
   	}else{
   		var metricName = "Annotation Metric: Annotation Nesting Level (ANL)"
   	}

   	d3.select('#annotMetric').text(metricName);
   }
  public static setProjectName(projectName: string){
	  d3.select('#projectUnderAnalysis').text('Project Under Analysis: ' + projectName);

  }
}
