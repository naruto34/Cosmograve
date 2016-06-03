function animation() {

	  var snapB = Snap("#svgB");

	  // SVG B - "Squiggly" Path
	  var myPathB = snapB.path("Mx1part y1partc-x2part-y2part").attr({
		id: "squiggle",
		fill: "none",
		strokeWidth: "4",
		stroke: "#ffffff",
		strokeMiterLimit: "10",
		strokeDasharray: "9 9",
		strokeDashOffset: "988.01"
	  });

	  // SVG B - Draw Path
	  var lenB = myPathB.getTotalLength();

	  // SVG B - Animate Path
	  myPathB.attr({
		  stroke: '#fff',
		  strokeWidth: 4,
		fill: 'none',
		// Draw Path
		"stroke-dasharray": lenB + " " + lenB,
		"stroke-dashoffset": lenB
	  }).animate({"stroke-dashoffset": 10}, 2500,mina.easeinout);

	  // SVG B - Circle
	  var CircleB = snapB.circle(16,16,8);
	  CircleB.attr({
		fill: "#3f4445",
		stroke: "#fff",
		strokeWidth: 2
	  });

	  setTimeout( function() {
		Snap.animate(0, lenB, function( value ) {
		   movePoint = myPathB.getPointAtLength( value );
		   CircleB.attr({ cx: movePoint.x, cy: movePoint.y }); // move along path via cx & cy attributes
		}, 2500,mina.easeinout);
	  });


}
