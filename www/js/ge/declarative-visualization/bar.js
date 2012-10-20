
define(['jquery', 'd3'], function($, d3) {
    
    // define the chart factory
    return function() {
        // local vars with default values, these should be changed from outside with setters
        var width = 100,
            height = 40,
            rounded = 10,
            min = 0,
            max = 100,
            tick = null,
            tickRadius = 3.5,
            showText = true;
        
        function my(selection) {

            var lo = min || 0,
                hi = max || 100;

            var x = d3.scale.linear().domain([lo, hi]).range([0, width]);

            var svg = selection.append("svg")
                .attr('class', 'visualization-bar')
                .attr('viewBox', [0, 0, width, height])
                .attr('preserveAspectRatio', 'xMinYMid');

            var g = svg.selectAll("rect")
                .data(selection.data())
                .enter().append("svg:g");

            var barHeight = height;

            if(showText) {
                var text = g.append("text")
                    .attr("class","num")
                    .attr('dy', -17)
                    .attr("text-anchor", "start") 
                    .text(selection.data());

                g.attr('transform', 'translate(0,' + text.node().getBBox().height + ')');

                var bbox = text.node().getBBox();
                barHeight = height - bbox.height;
                // make sure bar is a reasonable minimum height
                barHeight = Math.max(bbox.height/2, barHeight);

                // set viewBox to get automatic resizing without redoing all our geometry
                width = Math.max(width, bbox.width);
                height = Math.max(height, bbox.height + barHeight);
                svg.attr('viewBox', [0, 0, width, height]);
            }

            g.append("rect")
                .attr("class","bg")
                .attr("width", width)
                .attr("height", barHeight)
                .attr("rx", rounded)
                .attr("ry", rounded);

            var bar = g.append("rect")
                .attr("class", "fg")
                .attr("width", x)
                .attr("height", barHeight)
                .attr("rx", rounded)
                .attr("ry", rounded);

            // wash - gradient overlay
            var wash = svg.append('defs')
                .append('linearGradient')
                    .attr('id', 'wash')
                    .attr('gradientTransform', 'rotate(90)');
            wash.append('stop')
                .attr('offset', 0)
                .attr('stop-color', 'white');
            wash.append('stop')
                .attr('offset', 1)
                .attr('stop-color', 'black');

            g.append("rect")
                .attr("class", "gradient")
                .attr("width", x)
                .attr("height", barHeight)
                .attr('fill', 'url(#wash)')
                .attr('fill-opacity', 0.1);

            if(tick !== null) {
                var selector = g.append("circle")
                    .attr("class", "tick")
                    .attr('r', tickRadius)
                    .attr('cx', x(tick))
                    .attr('cy', barHeight/2);
            }
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
        my.rounded = function(value) {
          if (!arguments.length) return rounded;
          rounded = value;
          return my;
        };
        my.max = function(value) {
          if (!arguments.length) return max;
          max = value;
          return my;
        };
        my.min = function(value) {
          if (!arguments.length) return min;
          min = value;
          return my;
        };
        my.tick = function(value) {
          if (!arguments.length) return tick;
          tick = value;
          return my;
        };
        my.tickRadius = function(value) {
            if (!arguments.length) return tickRadius;
            tickRadius = value;
            return my;
        }
        my.showText = function(value) {
            if (!arguments.length) return showText;
            showText = value;
            return my;
        }
        
        return my;
    }
});
