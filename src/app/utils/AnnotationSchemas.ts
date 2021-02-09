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

    //Sort the array with the schemas
    this.schemasOrdered = Array.from(schemaSet) as string[];
    this.schemasOrdered.sort();

    const myColor = d3.scaleSequential().domain([0,this.schemasOrdered.length])
      .interpolator(d3.interpolateSpectral);
    
    this.schemasOrdered.forEach((value,i) => {
      this.schemasColorMap.set(value, d3.color(myColor(i)).formatHex());
      this.schemasObjectArray.push({ "schema" : value, "color" : d3.color(myColor(i)).formatHex()});
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