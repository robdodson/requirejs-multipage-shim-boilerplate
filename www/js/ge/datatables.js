/**
 *
 *   IIDS Data Table implementation
 *
 **/


define([
        'jquery',
        'datatables/jquery.dataTables',
        'datatables/TableTools',
        'datatables/ColReorder',
        // custom paging behavior
        'ge/datatables-paging'
    ], function($) {

        $.fn.iidsBasicDataGrid = function(opts) {
            this.each(function() {

                //
                // floater
                // dropdown button
                //

                var floater = $('<div class="btn-group">\
                                    <button class="btn dropdown-toggle btn-mini" data-toggle="dropdown"><i class="icon-chevron-down"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                      <li><a href="#">Show Only</a></li>\
                                      <li><a href="#">Hide</a></li>\
                                      <li><a href="#">Highlight</a></li>\
                                      <li class="divider"></li>\
                                      <li><a href="#">Share this</a></li>\
                                    </ul>\
                                </div>');

                var hideFloater = function() {
                    floater.css('display', 'none');
                }

                var showFloater = function() {
                    var isActive = $('.dropdown-menu').parent().hasClass('open');
                    if( isActive ) return;

                    floater.css('display', 'block');
                    var pos = $(this).offset();
                    pos.left += $(this).innerWidth() - floater.width() - 4;
                    pos.top += ( ( $(this).innerHeight() - floater.height() ) / 2 ) + 5;
                    floater.offset( pos );
                }

                hideFloater();


                //
                // table
                //

                var table;

                // first column for selection affordance
                // header column gets no content
                $('tr', this).slice(0,1).prepend( $('<th class="selector"><i class="icon-chevron-right" style="visibility:hidden"></i></th>') );
                $('tr', this).slice(1).prepend( $('<td class="selector"><i class="icon-chevron-right"></i></td>') );

                // callback for when table selection changes
                // enables styling of whole table based on
                // whether table contains selected rows
                var checkSelection = function() {
                    var oTT = TableTools.fnGetInstance(table.get()[0]);
                    var hasSelectedRows = (oTT.fnGetSelected().length > 0);
                    table.toggleClass('hasSelectedRows', hasSelectedRows);
                };

                table = $(this).dataTable({
                    // fixed columns
                    "sScrollX": "100%",
                    // "sScrollXInner": "100%",
                    "bScrollCollapse": false,
                    // "bScrollAutoCss": false,

                    // bootstrap pagination from http://datatables.net/media/blog/bootstrap_2/DT_bootstrap.js
                    "sDom": "TRrt<'table-controls'<'pull-left'l><'pull-right'ip>>",
                    "sPaginationType": "bootstrap",

                    // "bAutoWidth" : false,

                    "aoColumnDefs": [
                        { aTargets: ['selector'], bSortable: false, sWidth: '4.5%' },
                        { aTargets: ['numeric'], fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                            if($(nTd).is('td')) {
                                $(nTd).addClass('voice-data');
                            }
                        }}
                    ],

                    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                        // only "filterable" cells
                        $('td:not(.selector)', nRow).mouseenter(showFloater);
                        $('td.selector', nRow).mouseenter(hideFloater);
                    },

                    "oLanguage": {
                        "sInfo": "<strong>_START_</strong> - <strong>_END_</strong> of <strong>_TOTAL_</strong>",
                        "sInfoEmpty": "<strong>0</strong> - <strong>0</strong> of <strong>0</strong>"
                    },

                    "oTableTools": {
                        "aButtons": [], // hide all the extra export/copy/etc buttons
                        "sRowSelect": "multiple",
                        "sSwfPath": "/assets/swf/copy_csv_xls_pdf.swf",
                        "fnPreRowSelect": function(e) {
                            return $(e.target).parents().andSelf().is('.selector');
                        },
                        // register to observe rowSelected/rowDeselected events
                        "fnRowSelected": checkSelection,
                        "fnRowDeselected": checkSelection
                    },

                    "oColReorder": {
                        // first (selector) column is not reorderable
                        "iFixedColumns": 1 
                    },

                    "fnInitComplete" : function(){
                        $('.dataTables_wrapper').append( floater ).mouseleave( hideFloater );
                    }

                });


                //
                // initialization
                //

                // listen to key press events on any filter input elements
                // attribute data-filter-table="tableId" can be provided to live-filter a table
                $('input:text[data-filter-table="' + table.attr('id') + '"]').keyup(function(e) {
                    table.fnFilter($(this).val());
                });

                $(window).resize(function() {
                    table.fnAdjustColumnSizing();
                });

            });
        };
    }
);
