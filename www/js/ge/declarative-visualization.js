
// capture declarative visualization elements
requirejs(['jquery', 'd3', 'ge/declarative-visualization/bar', 'ge/declarative-visualization/gauge', 'ge/declarative-visualization/donut'], function($, d3, bar, gauge, donut) {

    $(function() {

        $('div[data-visualization="bar"]').each(function(i, domEl) {
            var el = $(domEl);
            d3.select(domEl)
		    	// configure the chart
                .datum([el.data('value')])
                .call( bar()
                    .width(el.width())
                    .height(el.height())
                    .rounded(0)
                    .min(el.data('min'))
                    .max(el.data('max'))
                    .tick(el.data('threshold'))
                );
        });
        
        $('div[data-visualization="gauge"]').each(function(i, domEl) {
            var el = $(domEl);
            d3.select(domEl)
		    	// configure the chart
                .datum([el.data('value')])
                .call( gauge()
                    .width(el.width())
                    .height(el.height())
                    .min(el.data('min'))
                    .max(el.data('max'))
                    .tick(el.data('threshold'))
                    .labelMin(el.data('label-min'))
                    .labelMax(el.data('label-max'))
                );
        });

        $('div[data-visualization="donut"]').each(function(i, domEl) {
            var el = $(domEl);
            d3.select(domEl)
                // configure the chart
                .data([el.data('source')])
                .call( donut()
                    .width(el.width())
                    .height(el.height())
                );
        });

        return {
            bar:bar,
            gauge: gauge,
            donut: donut
        };
    });
});
