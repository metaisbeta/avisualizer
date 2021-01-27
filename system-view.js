//library imports via npm
//browserfiy is necessary
const d3 = require("d3");

const width = 960;
const height = 650;

const svg = d3.select("#svg-container")
    .append("svg")
    .attr("width", width)
    .attr("height",height);

const g = svg.append("g")
  .attr("transform", "translate(1,1)");

const pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

// Define the div for the tooltip
const div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);

//Read JSON
d3.json("data/asniffer-sview.json").then(data => {

    const root = d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) =>  b.size - a.size);
    pack(root);
    
    // Add a group for all the descendents of the root node
    const node = svg.select("g")
    .selectAll("g")
    .data(root.descendants())
    .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
        .each(function(d) { d.node = this; });

    //Append a circle for each node
    node.append("circle")
        .attr("class", function(d) { return d.data.name; })
        .attr("r", function(d) { return d.r; })
        .on("mouseover", function(event, d) {	
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div.html(d.data.name + "<br/>")	
              .style("left", (event.pageX) + "px")		
              .style("top", (event.pageY - 28) + "px");	
        })
        .on("mouseout", function() { 
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
        });
        
    const circleBorder = d3.selectAll("circle").attr("stroke", 
                function(d) {
                  if(d.data.type=="package")
                    return "black";
                  else
                    return "blue";
                }).attr("stroke-dasharray", 
                function(d) {
                  if(d.data.type=="package")
                    return "5,5";
                  else
                    return null;
                });

    //obtain a list o schemas
    const schemas = root.descendants().filter(d => d.data.type=="schema");
    const schemaSet = new Set();
    schemas.forEach(d => schemaSet.add(d.data.name));

    const color = d3.scaleOrdinal(d3.schemeAccent);

    let schemaMapArray = [];
    const schemaMap = new Map();
    schemaSet.forEach((value,i) => {
      schemaMap.set(value, color(i));
      schemaMapArray.push({ "schema" : value, "color" : color(i)});
    });

    console.log(schemaMapArray);

   
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
        return "background-color:"+String(d.value);
    })
    .text(d => d.value);
 
    //Circles color
    d3.selectAll("circle").attr("fill", function(d) {
      if(d.data.type=="schema")
        return schemaMap.get(d.data.name);
      else if(d.data.type=="package")
        return "lightgreen";
      else
        return "lightblue";
      })

    const schemasSelector = d3.select("#select-color").selectAll("option").data(schemaSet).enter().append("option").attr("value", d => d).text(d => d);
    
    // Dont add labels to leaf and root
    // const leaf = node.filter(d => d.children);
    // leaf.append("text")
    //   .attr("clip-path", d => d.clipUid)
    // .selectAll("tspan")
    // .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    // .join("tspan")
    //   .attr("x", 0)
    //   .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
    //   .text(d => d);
    

   
  // create table
  const table = d3.select("#schemas-table");

 
}).catch(error => {
    console.log(error)
});




//Select Color
const colorSelect = d3.select("#select-color")
    	.on("change", function() {
        	let colorOption = colorSelect.property('value')
        	d3.selectAll('circle')
          	.transition()
          	.duration(750)
            .style('fill', function(d){
            	if(!d.children) {
                if (colorOption == "org.junit"){
                  return d.data.name == "org.junit" ? "red" : "white";
                }
                else if (colorOption == "java.lang") {
                  return d.data.name == "java.lang" ? "black" : "white";
                }
              }
            })
      });



  