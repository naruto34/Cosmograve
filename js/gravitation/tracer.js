function dessin() {


var M = [20];
var w = 500; //  width == largeur
var h = 500;  // height == hauteur

var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
var circle = svg.selectAll("circle")
                .data(M)
                .append("circle");	
			
	circle.attr("cx",w/2.0)
		  .attr("cy",h/2.0)
		  .attr("r",function(d) { return  d; });


					}

dessin();
