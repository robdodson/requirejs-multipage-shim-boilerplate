//The build will inline common dependencies into this file.

//For any third party dependencies, like Underscore or Backbone, place them in the vendor folder.

//Configure loading modules from the vendor directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: 'js/',
    paths: {
        // We've bundled jQuery and Require.js together per the
        // author's instructions: http://requirejs.org/docs/jquery.html
        // If you want to use an alternative to jQuery, like Zepto, then
        // you'll need to download the regular version of require.js and
        // create a path to Zepto here.
        jquery: 'vendor/require-jquery',
        underscore: 'vendor/underscore',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        // Underscore
        'underscore':                               { exports: '_' },

        // Bootstrap
        'bootstrap/bootstrap-alert':                [ 'jquery' ],
        'bootstrap/bootstrap-button':               [ 'jquery' ],
        'bootstrap/bootstrap-carousel':             [ 'jquery' ],
        'bootstrap/bootstrap-collapse':             [ 'jquery' ],
        'bootstrap/bootstrap-dropdown':             [ 'jquery' ],
        'bootstrap/bootstrap-modal':                [ 'jquery' ],
        'bootstrap/bootstrap-popover':              [ 'jquery', 'bootstrap/bootstrap-tooltip' ],
        'bootstrap/bootstrap-scrollspy':            [ 'jquery' ],
        'bootstrap/bootstrap-tab':                  [ 'jquery' ],
        'bootstrap/bootstrap-togglenav':            [ 'jquery' ],
        'bootstrap/bootstrap-tooltip':              [ 'jquery' ],
        'bootstrap/bootstrap-transition':           [ 'jquery' ],
        'bootstrap/bootstrap-typeahead':            [ 'jquery' ],
    }
});
