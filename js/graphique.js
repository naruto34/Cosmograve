function graphique_creation(){
	
	$('#graphique').empty();
	
	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 750 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom;
	
	// Set the ranges
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	// Define the line
	var valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
	
	// Adds the svg canvas
	var svg = d3.select("#graphique")
	.append("svg")
	.style("font-size", "12px")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(8);
	
	var yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(10);
	
	//d3.csv("data.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = d.date;
		d.close = +d.close;
	});
	//alert(data);
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);
	
	// Add the X Axis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px', 'shape-rendering' : 'crispEdges'})
	.call(xAxis);
	
	if(document.getElementById("grille").checked == true){
		svg.selectAll("line.x")
		.data(x.ticks(10))
		.enter().append("line")
		.attr("class", "x")
		.attr("x1", x)
		.attr("x2", x)
		.attr("y1", 0)
		.attr("y2", 390)
		.style("stroke", "grey")
		.style("stroke-width", "1")
		.style("shape-rendering", "crispEdges")
		.style("fill", "none");
		
		svg.selectAll("line.y")
		.data(y.ticks(8))
		.enter().append("line")
		.attr("class", "y")
		.attr("x1", 0)
		.attr("x2", 2000)
		.attr("y1", y)
		.attr("y2", y)
		.style("stroke", "grey")
		.style("stroke-width", "1")
		.style("shape-rendering", "crispEdges")
		.style("fill", "none");
	}
	
	// Add the Y Axis
	svg.append("g")
	.attr("class", "y axis")
	.style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px', 'shape-rendering' : 'crispEdges'})
	.call(yAxis);
	
	svg.append("text")
	.attr("class", "legend_titre")
	.attr("x", 175)
	.attr("y", -15)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.style("font-weight", "bold")
	.style("font-size", "1.3em")
	.text("Evolution du facteur d'\351chelle r\351duit");
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", 225)
	.attr("y", 415)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.style("font-weight", "bold")
	.style("font-size", "1.2em")
	.text("t (Ga)");
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", -150)
	.attr("y", -35)
	.attr("dy", ".3em")
	.attr("transform", "rotate(-90)")
	.style("font-weight", "bold")
	.style("font-size", "1.2em")
	.text("a (t)");
	
	// Add the valueline path.
	svg.append("path")
	.style("stroke", "steelblue")
	.style("stroke-width", "2")
	.style("fill", "none")
	.attr("class", "line")
	.attr("d", valueline(data));
	
}