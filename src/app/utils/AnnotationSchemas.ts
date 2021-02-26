import * as d3 from 'd3';
import * as loDash from 'lodash';

export class AnnotationSchemas{

  schemasColorMap: Map<any,any>;
  schemasOrdered: string[];
  schemasObjectArray: any[];

  //root is the root node after running d3.hierarchy
  constructor(root){
    this.schemasColorMap = new Map();
    this.schemasObjectArray = [];

    //obtain a list o schemas
    const schemasNode = root.descendants().filter(d => !loDash.isEmpty(d.data.properties));
    
    //To not get repeated schemas
    const schemaSet = new Set();
    schemasNode.forEach(d => schemaSet.add(d.data.properties.schema));
    var cors = ["green","red","blue","cyan","yellow","orange","magenta","purple"];
    var corslight = ["lightgreen","tomato","lightblue","teal","chocolate","Maroon","orchid","mediumpurple"]
    
    //Sort the array with the schemas
    this.schemasOrdered = Array.from(schemaSet) as string[];
    this.schemasOrdered.sort();
    var schemasGroups = [];
    var groupsMap = new Map();
    var colorsArray = [];
    var hexColors = [];
    this.schemasOrdered.forEach((value,i)=>{ // monta as famílias de schemas
		var schema = value.split("."); // divide o nome do schema a cada "."
                var family = schema[0]+"."+schema[1] // junta os dois primeiros termos; ex: org+"."+junit;
                
                if(groupsMap.has(family)){ // se já existe família; ex: org.springframework
                         
			var elem = groupsMap.get(family); // busca o array de elementos desta família
                        elem.push(value); // insere o valor ex: javax.persistence.metamodel na família javax.persistence
                        groupsMap.set(family,elem);
		}else{
                        colorsArray.push(family); 
			groupsMap.set(family,[value]);
		}          
	});
	
      
    const colorArr = d3.scaleOrdinal(d3.schemeCategory10).domain(colorsArray);
    const coress = d3.scaleSequential(d3.interpolateRgb(cors[0],corslight[0])).domain([0,4]);
    console.log(d3.color(coress(3)).formatHex());		
    for(let s in colorsArray){
        console.log(colorsArray[s]+" "+groupsMap.get(colorsArray[s]).length); 
	
        const cores = d3.scaleSequential(d3.interpolateRgbBasis([String(cors[s]),String(corslight[s])])).domain([0,groupsMap.get(colorsArray[s]).length]);
    	for(let r=0; r< groupsMap.get(colorsArray[s]).length;r++){
		hexColors.push(d3.color(cores(r)).formatHex());	
	}
       
    } 	
    console.log(hexColors.length);
    for(let j=0;j<hexColors.length;j++)
	console.log(hexColors[j]);	
    this.schemasOrdered.forEach((value,i) => {
      	const myColor = d3.scaleSequential(d3.interpolateRgb(cors[i],corslight[i])).domain([0,this.schemasOrdered.length]);
      this.schemasColorMap.set(value, hexColors[i]);
      this.schemasObjectArray.push({ "schema" : value, "color" : hexColors[i]});
    });
    
  }

  public getSchemasOrdered(): string[]{
    
    return this.schemasOrdered;

  }

  public getSchemasColorMap(): Map<any,any>{
    return this.schemasColorMap;
  }

  public getSchemasObjectArray(): any[]{
    return this.schemasObjectArray;
  }

}
