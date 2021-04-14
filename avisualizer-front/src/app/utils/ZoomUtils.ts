import * as d3 from "d3";

export class ZoomUtils{
  
  
  public static zoom(event,d, zoomProp,svg,node){
     
    if((d.data.type=="annotation" || d.data.type=="schema") ||  (d.data.type=="method" || d.data.type=="field"))
        return;
    zoomProp.focus = d;
    
    svg.transition()
      .duration(event.altKey ? 7500 : 0)
      .tween("zoom", d => {
        const i = d3.interpolateZoom(zoomProp.view, [zoomProp.focus.x, zoomProp.focus.y, zoomProp.focus.r * 2]);
	
        return t => this.zoomTo(i(t),svg,zoomProp,node);
      });

  }

  public static zoomTo(v,svg,zoomProp,node){
    const k = svg.attr("width") / v[2];
    zoomProp.view = v;

    node.attr("transform", d =>`translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }
  

}
