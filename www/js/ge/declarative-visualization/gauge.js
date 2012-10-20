/**
 * A function that creates a d3 gauge visualization
 */

define(['jquery', 'd3'], function($, d3, utils) {

    return function() {
        var width = 80,
            height = 80,
			min = 0,
            max = 100,
            tick = 40,
            tickRadius = 3.5,
            labelMin = 'min',
            labelMax = 'max';

        var labelHeight = 18;

        function my(selection) {
            var r = Math.min(width/2, height - labelHeight),
                r1 = r - 1, // pull in slightly for antialiasing slop
                r2 = r1 * 0.6,
                a1 = -Math.PI/2,
                a2 = Math.PI/2;

            var bg_arc = d3.svg.arc()
    		    .outerRadius(r1)
    		    .innerRadius(r2)
    		    .startAngle(a1)
    		    .endAngle(a2);

    		var arc = d3.svg.arc()
    		    .outerRadius(r1)
    		    .innerRadius(r2)
    		    .startAngle(a1)
    		    .endAngle(function(d) { return a2 * d/(max-min); });

    		var svg = selection.append('svg')
                .attr('class', 'visualization-gauge')
                .attr('viewBox', [0,0,width,height])
                .attr('preserveAspectRatio', 'xMidYMid');

            // svg.append('svg:rect').attr('width', width).attr('height', height).attr('fill', 'darkolivegreen');

            // gradient overlay
            var stopOpacity = 0.1;
            var wash = svg.append('defs')
                .append('linearGradient')
                    .attr('id', 'wash')
                    .attr('x1', 0).attr('x2', 0)
                    .attr('y1', 0).attr('y2', '100%');
            wash.append('stop')
                .attr('offset', 0)
                .attr('stop-color', 'white');
            wash.append('stop')
                .attr('offset', 1)
                .attr('stop-color', 'black');

    		var arc_path = svg.selectAll("path")
    		    .data(selection.datum());
    		
    		var g = arc_path.enter().append("svg:g")
                // add 1 pixel for antialiasing slop
                .attr('transform', 'translate(' + (r1+1) + ',' + (r1+1) + ')');

            // draw background shape
			var bgEl = g.append("svg:path")
				.attr("class", "bg")
				.attr("d", bg_arc);
            var washEl = g.append("svg:path")
                .attr('fill', 'url(#wash)')
                .attr('fill-opacity', 0.1)
                .attr("d", bg_arc);

            // draw tick dot
            var tickEl = g.append('svg:circle')
                .attr('r', tickRadius)
                .attr('cx', -(r1+r2)/2)
                .attr('class', 'tick')
                .attr('transform', function(d, i) { return 'rotate(' + (180 * tick/(max-min)) + ')' })
                .attr('fill', 'white');

            // draw needle
            // needle path is copied from illustrator-authored SVG (needle.ai) which is normalized to 100px len
            var scale = ((r1+r2)/2)/100;
            var needleEl = g.append('svg:path')
                .attr('d', 'M0.114-5.802c0,0,96.298,4.273,97.08,4.316c1.071,0.06,1.091,3.233-0.035,3.32C96.609,1.876,1.683,5.78,0.114,5.802C-2.71,1.946-2.698-1.75,0.114-5.802z')
                .attr('transform', function(d, i) { return 'rotate(' + (-180 + 180 * d/(max-min)) + ')' + ' ' + 'scale(' + scale + ')'})
                .attr('fill', 'black');

            // draw min/max labels
            var labelMinEl = g.append('text')
                .attr('class', 'label voice-data')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(' + (-(r1 + r2)/2) + ', 15)')
                .text(labelMin);
            var labelMaxEl = g.append('text')
                .attr('class', 'label voice-data')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(' + ((r1 + r2)/2) + ', 15)')
                .text(labelMax);
        }
        
        my.width = function(value) {
          if (!arguments.length) return width;
          width = value;
          return my;
        };
        my.height = function(value) {
          if (!arguments.length) return height;
          height = value;
          return my;
        };
        my.tick = function(value) {
            if (!arguments.length) return tick;
            tick = value;
            return my;
        }
        my.tickRadius = function(value) {
            if (!arguments.length) return tickRadius;
            tickRadius = value;
            return my;
        }
        my.min = function(value) {
          if (!arguments.length) return min;
          if( value !== undefined ) {
              min = value;
          }
          return my;
        };
        my.max = function(value) {
          if (!arguments.length) return max;
          max = value;
          return my;
        };
        my.labelMin = function(value) {
          if (!arguments.length) return labelMin;
          labelMin = value;
          return my;
        };
        my.labelMax = function(value) {
          if (!arguments.length) return labelMax;
          labelMax = value;
          return my;
        };

        return my;
    }

});
