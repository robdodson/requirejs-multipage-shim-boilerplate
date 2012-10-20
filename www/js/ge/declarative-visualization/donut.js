
define(['jquery', 'd3'], function($, d3) {
    
    // define the chart factory
    return function() {
        // local vars with default values, these should be changed from outside with setters
        var width = 720,
            height = 80;
        
        // TODO colors from central location
        // var color = d3.scale.ordinal().range([
        //     '#08A5E1', '#ED8000', '#76B900', '#711371', '#EE3324',
        //     '#6BC9ED', '#F4B366', '#ADD566', '#AA71AA', '#F5857C',
        //     '#056083', '#CA4D00', '#446B00', '#420B42', '#8A1E15',
        // ]);
        // TODO make it easy to do colors in either direction
        var color = d3.scale.ordinal().range(['#08A5E1', '#6BC9ED', '#056083']);
        // var color = d3.scale.ordinal().range(['#76B900', '#ADD566', '#446B00']);

        var textMinWidth = 80;

        function my(selection) {
            var r = Math.min(width-textMinWidth, height) / 2 - 10,
                innerRadius = r*0.5,
                outerRadius = r,
                textRadius = r + 15,
                arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
                angleOffset = Math.PI/2,
                donut = d3.layout.pie()
                    .startAngle(angleOffset).endAngle(Math.PI*2+angleOffset)
                    .value(function(d,i) {
                        // console.log(d);
                        return d[1];
                    });

            var svg = selection.append('svg')
                .attr('class', 'visualization-donut')
                .attr('viewBox', [0,0,width,height])
                .attr('preserveAspectRatio', 'xMidYMid')
                .data(selection.data())
                .append('svg:g')
                    .attr('transform', 'translate(' + (0) + ',' + (height/2 - r) + ')');

            //
            // wash
            //
            var wash = svg.append('defs')
                .append('linearGradient')
                    .attr('id', 'wash')
                    .attr('x1', 0).attr('x2', 0)
                    .attr('y1', -r).attr('y2', r)
                    .attr('gradientUnits', 'userSpaceOnUse');
            wash.append('stop')
                .attr('offset', 0)
                .attr('stop-color', 'white');
            wash.append('stop')
                .attr('offset', 1)
                .attr('stop-color', 'black');

            var arcs = svg.selectAll('g.arc')
                .data(donut)
                .enter().append('g')
                    .attr('class', 'arc')
                    .attr('transform', 'translate(' + outerRadius + ',' + (outerRadius) + ')');

            arcs.append('path')
                .attr('class', 'arc')
                .attr('fill', function(d, i) { return color(i) })
                .attr('d', arc);

            arcs.append('svg:path')
                .attr('class', 'arc')
                .attr('fill', 'url(#wash)')
                .attr('fill-opacity', 0.1)
                .attr('d', arc);

            // create HTML elements instead of SVG, so the text can wrap
            // that means creating a selection of arcs and applying them to the containing div?
            // alternatively - do manual text layout by measuring and creating tspans :P

            var c = d3.scale.category10();

            var ps = selection
                // TODO don't change the parent
                .attr('style', 'position: relative')
                .insert('div', ':first-child')
                    .attr('style', 'position: absolute; top: 0; left: ' + (r*2+16) +'px; right: 0')
                    .attr('class', 'legend')
                   .selectAll('p')
                // TODO try using .each
                    .data(selection.data()[0])
                    // .data(arcs.data())
                    .enter().append('p')
                        // .style('color', function(d,i) { return c(i) })
                        .html(function(d,i) {
                            // console.log(i,d);
                            return d[0] + '<br><strong>' + d[1] + '%</strong>';
                        });

            // draw whiskers - from each arc to the corresponding p

            // TODO do this in a declarative way
            arcs.each(function(d,i) {
                var src = arc.centroid(d);
                var pPos = $(ps[0][i]).offset();
                var svgPos = $(svg.node()).offset();
                var x2 = Math.floor(pPos.left - svgPos.left - 10);
                var y2 = Math.floor(pPos.top - svgPos.top + 4);
                var y1 = y2;
                var intersectionAngle = Math.asin( Math.max(0, y1/outerRadius) - 1 );
                // console.log((y1/outerRadius), intersectionAngle)
                var x1 = 3 + outerRadius + Math.floor(outerRadius * Math.cos(intersectionAngle));

                // console.log(y, Math.sin(y/outerRadius));
                // console.log(pPos.left - svgPos.left, pPos.top - svgPos.top)

                /*
                // draw text target points
                svg.insert('svg:circle', ':first-child')
                    .attr('r', 3)
                    .attr('cx', pPos.left - svgPos.left)
                    .attr('cy', pPos.top - svgPos.top)
                    .attr('fill', 'yellow');
                // draw circle target points
                svg.insert('svg:circle')
                    .attr('r', 3)
                    .attr('cx', x1)
                    .attr('cy', y1)
                    .attr('fill', 'orange')

                svg.insert('svg:line')
                    .attr('stroke', 'paleturquoise')
                    .attr('x1', x1)
                    .attr('y1', 0)
                    .attr('x2', x1)
                    .attr('y2', height)
                //*/

                if( y1 < 5) {
                    // draw the bend
                    x1 = outerRadius * 1.6;
                    var y3 = outerRadius * 0.05;
                    var bendIntersectionAngle = Math.asin( y3/outerRadius - 1);
                    var x3 = (outerRadius+6) + Math.floor(outerRadius * Math.cos(bendIntersectionAngle));
                    svg.insert('svg:line')
                        .attr('class', 'whisker')
                        .attr('x1', x1)
                        .attr('y1', y2+0.5)
                        .attr('x2', x3)
                        .attr('y2', y3+0.5)
                }

                if(y1 > (outerRadius*2 - 5)) {
                    x1 = outerRadius * 1.6;
                    var y3 = outerRadius * 1.95;
                    var bendIntersectionAngle = Math.asin( y3/outerRadius - 1 );
                    var x3 = (outerRadius+6) + Math.floor(outerRadius * Math.cos(bendIntersectionAngle));
                    svg.insert('svg:line')
                        .attr('class', 'whisker')
                        .attr('x1', x1)
                        .attr('y1', y2+0.5)
                        .attr('x2', x3)
                        .attr('y2', y3+0.5)
                }

                // we add 0.5 to y to force drawing on the pixel grid.
                // TODO see if SVG has a more robust way to do this.
                svg.insert('svg:line')
                    // .attr('stroke', c(i))
                    .attr('class', 'whisker')
                    .attr('x1', x1)
                    .attr('y1', y1+0.5)
                    .attr('x2', x2)
                    .attr('y2', y2+0.5)
            });
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

        return my;
    }
});
