'use strict';

define([
  'jquery',
  'app/models/aboutModel',
  'bootstrap'
],

function ($, model) {
  $(function() {
    // Set the title for our module with the data
    // from our model
    $('h1').html(model.getTitle());

    // Set the width of our progress bar with
    // data from our model.
    $('.bar').css({ 'width': model.getPercentComplete() });

    // Activate the bootstrap popover plugin
    $('[rel=popover]').popover({trigger: 'hover'});
  });
});