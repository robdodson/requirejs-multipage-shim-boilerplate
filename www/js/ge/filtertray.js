/**
 *
 *    IIDS Filter module
 *
 *    generates filter templated filter rules according to IIDS UX
 *
 **/

define( ['jquery'], function($) {
    var animDuration = 200;
    
    var makeFilterRule = function(tray) {
        var group = tray.find('.group-filter-rules');
        var newRule = $('#filter-rule-template').html();
        $(newRule).appendTo(group);
    };

    var removeFilterRule = function(ruleContainer) {
        ruleContainer.animate({height:0},animDuration,function(){
            ruleContainer.remove();
        });
    };

	$.fn.iidsFilterTray = function(opts) {
	    this.each(function() {
            var tray = $('.filter-tray', this);

            // create initial rule
            makeFilterRule(tray);

            tray.find('.filter-rule select')
                .first().val('highlight')
                .next().val('median')
                .next().val('<')
                .next().val('60');

            tray.find('.add-filter-rule').click(function(e) {
                e.preventDefault();
                makeFilterRule(tray);
            });

            tray.on('click', '.remove-filter-rule', function(e) {
                e.preventDefault();
                removeFilterRule( $(this).closest('.filter-rule') );
            });
	    });
    };
});
