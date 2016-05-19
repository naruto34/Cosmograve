// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
width = 450 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// Parse the date / time
//var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0,width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
.orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
.orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.close); });

// Adds the svg canvas
var svg = d3.select("#graphique")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Get the data
data = [
];

//d3.csv("data.csv", function(error, data) {
data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
});

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.close; })]);


// Add the valueline path.
svg.append("path")
.attr("class", "line")
.attr("d", valueline(data));

// Add the X Axis
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

// Add the Y Axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis);

svg.selectAll("line.x")
			.data(x.ticks(10))
			.enter().append("line")
			.attr("class", "x")
			.attr("x1", x)
			.attr("x2", x)
			.attr("y1", 0)
			.attr("y2", 390)
			.style("stroke", "#ccc");
		
svg.selectAll("line.y")
			.data(y.ticks(8))
			.enter().append("line")
			.attr("class", "y")
			.attr("x1", 0)
			.attr("x2", 2000)
			.attr("y1", y)
			.attr("y2", y)
			.style("stroke", "#ccc");	


svg.append("text")
.attr("class", "legend_titre")
.attr("x", 175)
.attr("y", -15)
.attr("dy", ".3em")
.attr("transform", "rotate(0)")
.text("Potentiel Effectif");

svg.append("text")
.attr("class", "legend_axe")
.attr("x",width+10 )
.attr("y",height)
.attr("dy", ".3em")
.attr("transform", "rotate(0)")
.text("r");

svg.append("text")
.attr("class", "legend_axe")
.attr("x",-10)
.attr("y",-20)
.attr("dy", ".3em")
.attr("transform", "rotate(0)")
.text("V(r)");

