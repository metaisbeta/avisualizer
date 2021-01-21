//library imports via npm
//browserfiy is necessary
const d3 = require("d3");

const width = 960;
const height = 650;

const svg = d3.select("#svg-container")
    .append("svg")
    .attr("width", width)
    .attr("height",height);

    // <svg width="960" height="650"><g transform="translate(1,1)"></g></svg>
const g = svg.append("g")
    .attr("transform", "translate(1,1)");

const pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

// Different way for us to get a color scale
const color = d3.scaleSequential(d3.interpolateMagma)
    .domain([-4, 4]);

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
        .each(function(d) { d.node = this; })
        // .on("mouseover", hovered(true))
        // .on("mouseout", hovered(false));

    // Append a circle to each node. Color-coded by level of the hierarchy 
    node.append("circle")
        .attr("class", function(d) 
        { 
           
            return d.data.name; 
        
        })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.depth); });
    
    // Dont add labels to leaf and root
    const leaf = node.filter(d => d.children);
    leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);
    

    
  
}).catch(error => {
    console.log(error)
});



const colorSelect = d3.select("#select-color")
    	.on("change", function() {
        	let colorOption = colorSelect.property('value')
        	d3.selectAll('circle')
          	.transition()
          	.duration(750)
            .style('fill', function(d){
            	if(!d.children) {
                if (colorOption == "junit"){
                  return d.data.name == "org.junit" ? "green" : "white"
                }
                else if (colorOption == "lang") {
                  return d.data.name == "java.lang" ? "black" : "white"
                }
              }
            	else {
                return "null"
              }
          	})
      })