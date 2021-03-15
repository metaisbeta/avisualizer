import * as d3 from 'd3';
import * as loDash from 'lodash';

export class AnnotationSchemas{

  schemasColorMap: Map<any,any>;
  schemasOrdered: string[];
  schemasObjectArray: any[];
  schemasGroups: string[];
  schemasTotalAnnotations: Map<any,any>
  //root is the root node after running d3.hierarchy
  constructor(root,name){
    this.schemasColorMap = new Map();
    this.schemasObjectArray = [];
    //obtain a list o schemas
   const schemaSet = new Set();     
   if(name=="class"){
      root.descendants().forEach(d=>{if(d.data.type=="annotation") { schemaSet.add(d.data.properties.schema);}});

   console.log("class",schemaSet.size);
   }
   else{
    const schemasNode = root.descendants().filter(d => !loDash.isEmpty(d.data.properties));
    console.log(schemasNode.length);
    //To not get repeated schemas
    schemasNode.forEach(d =>  schemaSet.add(d.data.properties.schema));
     console.log("a",schemaSet.size);
   }
    
    
    var cors = ['#1f78b4','#a6cee3','#b2df8a','#33a02c','#fb9a99','#e31a1c','#40004b','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];
    var corslight = ['#80b1d3','#8dd3c7','#ccebc5','#b3de69','#fccde5','#fb8072','#fdb462','#ffffb3','#9970ab','#bc80bd','#ffed6f','#bebada'];
    //Sort the array with the schemas
    this.schemasOrdered = Array.from(schemaSet) as string[];
    this.schemasOrdered.sort();
    this.schemasGroups = [];
    this.schemasTotalAnnotations = new Map();    
    //counting total annotations of each schema
    for(var i=0;i<this.schemasOrdered.length;i++){
    	this.schemasTotalAnnotations.set(this.schemasOrdered[i],0);	
    }
    for(var i=0;i<root.descendants().length;i++){
	if(root.descendants()[i].data.type=="annotation"){
                var total = this.schemasTotalAnnotations.get(root.descendants()[i].data.properties.schema);
                var toSum = root.descendants()[i].data.value;
                this.schemasTotalAnnotations.set(root.descendants()[i].data.properties.schema,(total+toSum));  
		
	}
		    
    }
    //build schemas families
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
    //console.log(d3.color(coress(3)).formatHex());		
    for(let s in colorsArray){
        //console.log(colorsArray[s]+" "+groupsMap.get(colorsArray[s]).length); 
	
        const cores = d3.scaleSequential(d3.interpolateRgbBasis([String(cors[s]),String(corslight[s])])).domain([0,groupsMap.get(colorsArray[s]).length]);
    	for(let r=0; r< groupsMap.get(colorsArray[s]).length;r++){
		hexColors.push(d3.color(cores(r)).formatHex());	
	}
       
    } 	
    	
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
