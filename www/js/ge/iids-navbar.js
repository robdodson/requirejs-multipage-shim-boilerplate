//
// IIDS Responsive Navigation Bar functionality
//
require([
    'jquery',
    'bootstrap/bootstrap-collapse',
    'bootstrap/bootstrap-transition'
], function ($) {
    $(function () {
        // navbar tooltips
        $('.navbar a[rel="tooltip"]').tooltip({ placement: 'bottom' });

        // Move the user dropdown and nav search in the primary-navbar when collapsing.
        function moveUserUtilitiesAndSearchContainer() {
            // Move the user utilities and search container.
            if ( $(window).width() <= 979 ) {
                // Move from masthead to primary-navbar.
                $( '.navbar .primary-navbar .container' ).prepend( $('.navbar .masthead .user-utilities-and-search-container') );
                $( '.navbar .primary-navbar .user-utilities .dropdown-menu' ).addClass( 'pull-left' ).removeClass( 'pull-right' );
            } else {
                // Move from primary-navbar to masthead.
                $( '.navbar .masthead .container' ).append( $('.navbar .primary-navbar .user-utilities-and-search-container') );
                $( '.navbar .masthead .user-utilities .dropdown-menu' ).addClass( 'pull-right' ).removeClass( 'pull-left' );
            }
            // Move the notifications container.
            if ( $(window).width() <= 480 ) {
                // Move from masthead to primary-navbar.
                $( '.navbar .primary-navbar .container' ).prepend( $('.navbar .masthead .notifications') );
                $( '.navbar .primary-navbar .notifications .dropdown-menu' ).addClass( 'pull-left' ).removeClass( 'pull-right' );
                $( '.mega-dropdown' ).css( 'position', 'static' );
            } else {
                // Move from primary-navbar to masthead.
                $( '.navbar .masthead .container' ).append( $('.navbar .primary-navbar .notifications') );
                $( '.navbar .masthead .notifications .dropdown-menu' ).addClass( 'pull-right' ).removeClass( 'pull-left' );
                $( '.mega-dropdown' ).css( 'position', 'absolute' );
            }
            // Resize mega-dropdowns
            $('.mega-dropdown').each(
                function() {
                    $( this ).css( { left: 0, width: ( $( this ).parents('.primary-navbar .container').width() ) } );
                }
            );
        }
        // Attach to collapse event.
        $('.navbar .primary-navbar').on( 'show', function() { $( '.navbar .masthead .btn-collapse').addClass('in'); moveUserUtilitiesAndSearchContainer(); } );
        // Disable overflow so that our dropdowns will work correctly.
        $('.navbar .primary-navbar').on( 'shown', function() { $( this ).css( 'overflow', 'visible' ); } );
        // Set the overflow back to hide so it will collapse properly.
        $('.navbar .primary-navbar').on( 'hide', function() { $( '.navbar .masthead .btn-collapse').removeClass('in'); $( this ).css( 'overflow', 'hidden' ); } );
        // Attach to window resize.
        $( window ).on( 'resize', moveUserUtilitiesAndSearchContainer );
        // Run on startup.
        moveUserUtilitiesAndSearchContainer();

        // Hide the fake faceted dropdown when the search field is blurred (loses focus).
        $('.navbar .search-query').on(
            'blur',
            function () {
                $(this).parents('.navbar-search').removeClass('open');
            }
        );

        // Make "mega" dropdowns extend the full width of the screen.
        $('.mega-dropdown').each(
            function() {
                var $this = $( this );
                var $toggle = $this.prev('.dropdown-toggle');
                $this
                    .css( { left: 0, width: ( $this.parents('.primary-navbar .container').width() ) } )
                    .before( '<span class="mega-dropdown-arrow" style="left: ' + ( $toggle.offset().left - ( $toggle.width() / 2 ) + 2 ) + 'px;"></span>' )
                    .parent('.btn-group').css('position','static');
            }
        );

        // For enabling opt-in bootstrap components appearing in the navbar.
        // Do we need this? We're already doing something very similar at the top of the file. --rd
        $('.navbar [rel=tooltip]').tooltip();

    });
});
