const d3 = require("d3");
const _ = require('lodash');


const width = 960;
const height = 960;



const pack = d3.pack()
    .size([width - 2, height - 10])
    .padding(3);

// Define the div for the tooltip
const divTooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

d3.json("data/SpaceWeatherTSI-PV.json").then(data => {
    
    const root = d3.hierarchy(data);
    
    root.descendants().forEach(d => {
        d.data.value = d.data.value+1;//adding 1 to each AA, to avoid 0
    });
   
    root.sum(d => d.value)
    .sort((a, b) =>  b.value - a.value);
    
    pack(root);

    let focus = root;
    let view;

    const svg = d3.select("#svg-container-pv")
        .append("svg")
        .attr("viewBox", `-${width / 2} -${(height / 2)} ${width} ${height}`)
        .attr("width",width)
        .attr("height",height)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", "lightblue")
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));

    const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("class", d => {
            return d.data.type;
        })
        //.attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function(event, d) {	
            //Creating the label
            divTooltip.transition()		
                .duration(200)		
                .style("opacity", .9);
            divTooltip.html(buildTooltip(d) + "<br/>")	
                .style("left", (event.pageX) + "px")		
                .style("top", (event.pageY - 28) + "px");

            //highlight the node
            //const circle = svg.select("g").append("circle").attr("r",d.r).attr("fill", "red").attr("cx",this.attr("cx")).attr("cy",this.attr("cy"));
            console.log(event);
            console.log(d);  
            console.log(this);

          })
          .on("mouseout", function() { 
            divTooltip.transition()		
                .duration(500)		
                .style("opacity", 0);
            
            //unhighlight the node
          })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    const circleBorder = d3.selectAll("circle")
        .attr("stroke", 
            function(d) {
                if(d.data.type=="package")
                    return "black";
                else
                    return "blue";
            })
        .attr("stroke-dasharray", 
            function(d) {
                if(d.data.type=="package")
                    return "5,5";
                else
                    return null;
        });

    //Schema table

    //obtain a list o schemas
    const schemasNode = root.descendants().filter(d => !_.isEmpty(d.data.properties));
    
    //To not get repeated schemas
    const schemaSet = new Set();
    schemasNode.forEach(d => schemaSet.add(d.data.properties.schema));

    const schemas = Array.from(schemaSet)
    schemas.sort();

    const myColor = d3.scaleSequential().domain([0,schemas.length])
      .interpolator(d3.interpolateSpectral);
    
    let schemaMapArray = [];
    const schemaMap = new Map();
    schemas.forEach((value,i) => {
      schemaMap.set(value, d3.color(myColor(i)).formatHex());
      schemaMapArray.push({ "schema" : value, "color" : d3.color(myColor(i)).formatHex()});
    });

   
    //get the table with schemas
    const schema_table = d3.select("#schemas-table");

    //populate table
    var rows = schema_table.select("tbody").selectAll("tr").data(schemaMapArray).enter().append("tr");

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
    .text(d => d.value);


    //Zoom function

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
        const k = width / v[2];
    
        view = v;
    
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
        const focus0 = focus;
        if(d.data.type=="annotation")
            return;
        focus = d;
    
        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
              const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
              return t => zoomTo(i(t));
            });
    }


    //Circles color
    d3.selectAll("circle")
        .attr("fill", function(d) {
            if(d.data.type=="package")
                return "lightgreen";
            else if(d.data.type =="annotation")
                return schemaMap.get(d.data.properties.schema);
            else
                return "white";
        })


    const schemasSelector = d3.select("#select-color").selectAll("option").data(schemaSet).enter().append("option").attr("value", d => d).text(d => d);
    


}).catch(error => {
    console.log(error)
});


function buildTooltip(node){

    let packageName;
    let annotationName;
    let schemaName;
    let className;
    let nodeData = node.data.name;
    if(node.data.type=="annotation"){
        schemaName = "Schema: " + node.data.properties.schema;
        className = "Class: " + node.parent.data.name;
        return className + "<br/>" + schemaName + "<br/>" + "Annotation: " + nodeData;
    }else if(node.data.type=="package")
        return "Package: " + nodeData;
    else{
        return node.data.type + ": " + nodeData;
    }
}