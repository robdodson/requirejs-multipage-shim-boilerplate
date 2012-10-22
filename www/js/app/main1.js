define([
    'jquery',
    'app/models/model1',
    'ge/iids-navbar'
],
function ($, model) {
    // jQuery DOM Ready Handler
    $(function() {
        // Set the title for our module with the data
        // from our model
        $('.page-header h1').html(model.getTitle());

        // Set the width of our progress bar with
        // data from our model.
        $('.bar').css({ 'width': model.getPercentComplete() });
    });
});