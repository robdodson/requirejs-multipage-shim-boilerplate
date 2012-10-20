
define( ['jquery', 'spin'], function($, Spinner) {

	// extend jquery to use spinner
	$.fn.spin = function(opts) {
		// define default options
		var opts = opts || {
			lines: 10, // The number of lines to draw
			length: 4, // The length of each line
			width: 2, // The line thickness
			radius: 4, // The radius of the inner circle
			rotate: 0, // The rotation offset
			color: '#313337', // #rgb or #rrggbb
			speed: 1.2, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto' // Left position relative to parent in px
		};
		this.each(
			function() {
				var $this = $(this),
					data = $this.data();

				if (data.spinner) {
					data.spinner.stop();
					delete data.spinner;
				}
			
				if (opts !== false) {
					data.spinner = new Spinner( $.extend( { color: $this.css('color') }, opts ) ).spin( this );
				}
			}
		);
		return this;
	};

});