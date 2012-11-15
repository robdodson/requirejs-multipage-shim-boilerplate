//The build will inline common dependencies into this file.

//For any third party dependencies, like Underscore or Backbone, place them in the vendor folder.

//Configure loading modules from the vendor directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: '/js/',
    paths: {
        'jquery':                                   'vendor/require-jquery',
        'bootstrap':                                'vendor/bootstrap',
        'jquery-ui':                                'vendor/jquery-ui',
        'd3':                                       'vendor/d3.v2',
        'highstock':                                'vendor/highstock',
        'datatables':                               'vendor/datatables',
        'prettify':                                 'vendor/prettify/prettify',
        'spin':                                     'vendor/spin'
    },
    shim: {
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

        // Highcharts (Highstock)
        'highstock':                                ['jquery'],

        // DataTables
        'datatables/jquery.dataTables':             ['jquery'],
        'datatables/TableTools':                    ['datatables/jquery.dataTables'],
        'datatables/ColReorder':                    ['datatables/jquery.dataTables'],

        // D3
        // `exports` tells requirejs to use the global d3 object as the module value
        // it does not, however, allow you to change the name of the module to 'd9' or 'foobar'
        // `exports` can also be a function which returns a value like `return jQuery.noConflict()`
        'd3':                                       { deps: [ 'jquery' ], exports: 'd3' }
    }
});
