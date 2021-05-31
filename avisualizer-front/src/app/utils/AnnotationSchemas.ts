import * as d3 from 'd3';
import * as loDash from 'lodash';

export class AnnotationSchemas{

  schemasColorMap: Map<any,any>;
  schemasOrdered: string[];
  schemasObjectArray: any[];
  annotationsList: Map<any,any>;
  annotationsCount: Map<any,any>
  schemasGroups: string[];
  schemasTotalAnnotations: Map<any,any>;
  startColors: Map<any,any>;
  endColors: Map<any,any>;
  //root is the root node after running d3.hierarchy
  constructor(root,name){
    this.schemasColorMap = new Map();
    this.schemasObjectArray = [];
    //obtain a list o schemas
   const schemaSet = new Set();
   if(name=="class"){
      root.descendants().forEach(d=>{if(d.data.type=="annotation") { schemaSet.add(d.data.properties.schema);}});


   }
   else if (name=="package"){
    const schemasNode = root.descendants().filter(d => !loDash.isEmpty(d.data.properties));

    //To not get repeated schemas
    schemasNode.forEach(d =>  schemaSet.add(d.data.properties.schema));

   }else{
   	const schemasNode = root.descendants().filter(d => d.data.type=="schema");

    //To not get repeated schemas
    schemasNode.forEach(d =>  schemaSet.add(d.data.name));
   }
   this.annotationsList = new Map();
   this.annotationsCount = new Map();	
    var cors = ['#1f78b4','#33a02c','#fb9a99','#e31a1c','#40004b','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];
    var corslight = ['#80b1d3','#B9D48C','#fccde5','#fb8072','#fdb462','#ffffb3','#9970ab','#bc80bd','#ffed6f','#bebada'];
    //Sort the array with the schemas
    this.schemasOrdered = Array.from(schemaSet) as string[];
    this.schemasOrdered.sort();
    //console.log(this.schemasOrdered)
    if(name=="package"){
    	    for(var s in this.schemasOrdered){
	this.annotationsList.set(this.schemasOrdered[s],[]);
    }
       this.schemasTotalAnnotations = new Map();
        var somatotal = new Map();
           for(var i=0;i<this.schemasOrdered.length;i++){
    	this.schemasTotalAnnotations.set(this.schemasOrdered[i],0);
    	somatotal.set(this.schemasOrdered[i],0);
    }
        for(var i=0;i<this.schemasOrdered.length;i++){
    	this.schemasTotalAnnotations.set(this.schemasOrdered[i],0);
    	somatotal.set(this.schemasOrdered[i],0);
    }
    root.descendants().forEach(d=>{
    		if(d.data.type=="annotation" && d.data.properties.schema!=null){
    			var arr = this.annotationsList.get(d.data.properties.schema);
    			if(!arr.includes(d.data.name)){
    				arr.push(d.data.name)
    				this.annotationsCount.set(d.data.name,1);
    				
    			}else{
    				var value = this.annotationsCount.get(d.data.name);
    				//value=value+d.data.value;
    				this.annotationsCount.set(d.data.name,(value+1));
    			}
    				
    			this.annotationsList.set(d.data.properties.schema,arr);
    			var total = this.schemasTotalAnnotations.get(d.data.properties.schema);
                
                this.schemasTotalAnnotations.set(d.data.properties.schema,(total+1));
    		}
    	});
   	
    this.schemasGroups = [];
 
   
    //counting total annotations of each schema


    }

     
    //build schemas families
    var groupsMap = new Map();
    var colorsArray = [];
    var hexColors = new Map();

    this.schemasOrdered.forEach((value,i)=>{ // monta as famílias de schemas
		var schema = value.split("."); // divide o nome do schema a cada "."]

		if (schema[0]=="javax"){
			if(schema[1]=="persistence" || schema[1]=="ejb")
                		var family = schema[0]+"."+schema[1];
                	else
                		var family = schema[0];
                	//console.log(schema[0],schema[1]);
                }else{
                	//console.log(family);
                	var family = schema[0]+"."+schema[1];
                }
                //console.log(value,family)

                if(groupsMap.has(family)){ // se já existe família; ex: org.springframework

			var elem = groupsMap.get(family); // busca o array de elementos desta família
                        elem.push(value); // insere o valor ex: javax.persistence.metamodel na família javax.persistence
                        groupsMap.set(family,elem);
		}else{
                        colorsArray.push(family);
			groupsMap.set(family,[value]);
		}
	});
	

 	var startColors = new Map();
  var endColors = new Map();
  var schemasArr= ["java.lang","javax.persistence","org.hibernate","org.springframework","org.junit","org.mockito","javax.ejb"];
  var startArr = ["#146FF2","#FF95FE","#B64DB5","#ff7f00","#40004b","#6B00B8","#32F214"];
  var endArr = ["#146FF2","#FABBFA","#B64DB5","#ffffb3","#3E05A8","#C77EFB","#32F214"];
  for(var i=0;i<schemasArr.length;i++){
    	startColors.set(schemasArr[i],startArr[i]);
    	endColors.set(schemasArr[i],endArr[i]);
  }

    for(let s in colorsArray){

	if(startColors.has(colorsArray[s])){

		const cores = d3.scaleSequential(d3.interpolateRgbBasis([String(startColors.get(colorsArray[s])),String(endColors.get(colorsArray[s]))])).domain([0,groupsMap.get(colorsArray[s]).length]);
		//console.log(groupsMap.get(colorsArray[s]),startColors.get(colorsArray[s]),endColors.get(colorsArray[s]),startColors.has(colorsArray[s]))
	    	for(let r=0; r< groupsMap.get(colorsArray[s]).length;r++){

			hexColors.set(groupsMap.get(colorsArray[s])[r],d3.color(cores(r)).formatHex());
		}

	}else if(colorsArray[s]=="javax"){
		//console.log(groupsMap.get(colorsArray[s]),cors[s],corslight[s])
		const cores = d3.scaleSequential(d3.interpolateRgbBasis([String("red"),String("#FEBAB8")])).domain([0,groupsMap.get(colorsArray[s]).length]);
	    	for(let r=0; r< groupsMap.get(colorsArray[s]).length;r++){

			hexColors.set(groupsMap.get(colorsArray[s])[r],d3.color(cores(r)).formatHex());
		}
	}else{
			//console.log(groupsMap.get(colorsArray[s]),cors[s],corslight[s])
		const cores = d3.scaleSequential(d3.interpolateRgbBasis([String("#23201F"),String("#B6B5B4")])).domain([0,groupsMap.get(colorsArray[s]).length]);
	    	for(let r=0; r< groupsMap.get(colorsArray[s]).length;r++){
	    		//console.log(d3.color(cores(r)).formatHex(),groupsMap.get(colorsArray[s])[r]);
			hexColors.set(groupsMap.get(colorsArray[s])[r],d3.color(cores(r)).formatHex());
		}
	}

    }
    this.schemasOrdered.forEach((value,i) => {
      this.schemasColorMap.set(value, hexColors.get(value));
      this.schemasObjectArray.push({ "schema" : value, "color" : hexColors.get(value)});
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
  public getAnnotationsList(): Map<any,any>{
  	return this.annotationsList;
  }
    public getAnnotationsCount(): Map<any,any>{
  	return this.annotationsCount;
  }
 

}
