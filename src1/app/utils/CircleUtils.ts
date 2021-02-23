export class CircleUtils{

    constructor(){}

    public static addCircleStroke(node): string{
        if(node.data.type=="package")
            return "black";
        else
            return "blue";
      }
    
    public static addCircleDashArray(node): string{
        if(node.data.type=="package")
            return "5,5";
        else
            return null;
    }

    public static colorCircles(node: any, schemasMap: Map<any,any>): string{
        if(node.data.type=="package")
            return "lightgreen";
        else if(node.data.type =="annotation")
            return schemasMap.get(node.data.properties.schema);
        else if(node.data.type =="schema")
            return schemasMap.get(node.data.name);
        else
            return "white";
    }

}