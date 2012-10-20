define([
	'jquery',
	'highstock',
	'./charts-theme-classic'
], function($) {
	return {

		area: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'area'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		areaStacked: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'area'
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				}
			};

			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		line: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'line'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		stock: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'line'
				}
			};
			// HighStock ignores some options set by theme - so use them as the base we pass in
			// this will be fixed in a future version
			// https://github.com/highslide-software/highcharts.com/commit/884c19926ef662c0546eb70b36246b3757b506a9
			var base = Highcharts.getOptions();
			// var chart = new Highcharts.StockChart( $.extend(true, base, cfg, options) ); console.log(chart.options); return chart;
			return new Highcharts.StockChart( $.extend(true, {}, base, cfg, options) );
		},

		bar: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'bar'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		barStacked: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'bar'
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		column: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'column'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		columnStacked: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'column'
				},
				plotOptions: {
					series: {
						stacking: 'normal'
					}
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		pie: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'pie'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		donut: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'pie'
				},
				plotOptions: {
					pie: {
						innerSize: '60%',
					}
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		},

		scatter: function(el, options) {
			var cfg = {
				chart: {
					renderTo: el,
					type: 'scatter'
				}
			};
			return new Highcharts.Chart($.extend(true, {}, cfg, options));
		}
	}
});
