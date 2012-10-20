define([
    'jquery',
    'underscore',
    'app/models/model1',
    'bootstrap/bootstrap-popover',
    'ge/iids-navbar'
],
function ($, _, model) {
    // jQuery DOM Ready Handler
    $(function() {
        // Set the title for our module with the data
        // from our model
        $('.page-header h1').html(model.getTitle());

        // Set the width of our progress bar with
        // data from our model.
        $('.bar').css({ 'width': model.getPercentComplete() });

        // Activate the bootstrap popover plugin
        $('[rel=popover]').popover();
    });
});