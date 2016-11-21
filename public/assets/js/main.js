(function($) {
    "use strict";
    $(window).on('scroll', function() {

        var y = $(window).scrollTop(),
            topBar = $('header');


        if (y > 1) {
            topBar.addClass('sticky');
            $('header .logo a').removeClass('logo-light');
            $('header .logo a').addClass('logo-dark');
            $('.main-navigation li.current a').addClass('current-sticky');
            $('.main-navigation li.highlight').addClass('sticky-sep');
            $('a.menu-toggle span').addClass('menu-open');
            $('.main-navigation li a').addClass('menu-open-main');


        } else {
            topBar.removeClass('sticky');
            $('header .logo a').removeClass('logo-dark');
            $('header .logo a').addClass('logo-light');
            $('.main-navigation li.current a').removeClass('current-sticky');
            $('.main-navigation li.highlight').removeClass('sticky-sep');
            $('.main-navigation li.highlight').addClass('with-sep');
            $('a.menu-toggle span').removeClass('menu-open');
            $('.main-navigation li a').removeClass('menu-open-main');

        }
    });
})(jQuery); // End of use strict




$(document).ready(function() {
    //Go to top button
    $("#go-top").on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    //Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Mobile Menu
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation-mobile');

    toggleButton.on('click', function(event) {
        event.preventDefault();

        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $(window).resize(function() {
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        else nav.removeClass('mobile');
    });

    $('#main-nav-wrap li a').on("click", function() {

        if (nav.hasClass('mobile')) {
            toggleButton.toggleClass('is-clicked');
            nav.fadeOut();
        }
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    //Carousel
    $("#bg-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        autoPlay: 5000,
        paginationSpeed: 100,
        singleItem: true,
        mouseDrag: false,
        transitionStyle: "fade"
    });

    //Accordion Faq
    $(document).on('show', '.accordion', function(e) {
        $(e.target).prev('.accordion-heading').addClass('accordion-opened');
    });

    $(document).on('hide', '.accordion', function(e) {
        $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
    });




    //Sortable Function for Faq
    var items = $('.item');
    items.show();
    $('.faq-filters li').on('click', function(e) {
        var category = $(this).data('filter');
        $(".clicked-filter").removeClass("clicked-filter");
        $(this).addClass("clicked-filter");
        //When user select 'All' show all items
        $('.item').each(function() {
            data = $(this).data('cat');
            if (data == category) {
                $(this).show();
            }
            if (data != category) {
                $(this).hide();
            }
            if (category == "*") {
                items.show();
            }
        });
        e.preventDefault();
    });

    //Clickable Map Appear
    if ($("#show-map").length > 0) {
        document.getElementById('show-map').onclick = function() {
            var map = document.getElementById('map-hidden');
            var opening = document.getElementById('show-map').className;
            if (map.className === "hide") {
                map.className = 'show';
                $('#map-hidden').addClass('animated fadeIn');
                document.getElementById('show-map').className = 'pe-7s-map-marker activa';
            }
            if (opening == "pe-7s-map-marker activa") {
                map.className = 'hide';
                document.getElementById('show-map').className = 'pe-7s-map-marker';
            }
        }
    }
    //Morphext
    $("#word-rotate").Morphext({
        animation: "fadeIn", // Overrides default "bounceIn"
        separator: ",", // Overrides default ","
        speed: 3500, // Overrides default 2000
        complete: function() {
            // Overrides default empty function
        }
    });

    //Typed Text
    $("#typed").typed({
        strings: ["Creative Multipurpose Software Template", "Design Templates with Usability.", "Showcase your product."],
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        // defaults to false for infinite loop
        loopCount: true,
        resetCallback: function() {
            newTyped();
        }
    });
    //Slider Hero
    $('.hero--slider').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        fade: true,
        speed: 1000,
        cssEase: 'linear'
    });

    //Services Tabs
    $('.tab-content').not('.active').hide();

    $('.tab-nav a').on('click', function(e) {
        e.preventDefault();
        $('.tab-nav a').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').hide();
        $($.attr(this, 'href')).fadeIn(300);
    });
    /* Video Tab Overlay */
    $('.video .overlay-video').on('click', function(ev) {
        $(this).fadeOut(300);
        $("#elvideo")[0].src += "&autoplay=1";
        ev.preventDefault();
    });

    //Archive Widget Blog

    $(".archive-first").on("click", function() {
        var obj = $(this).next();
        if ($(obj).hasClass("inactive-children")) {
            $(obj).removeClass("inactive-children").slideDown();
            $(this).find('.fa-plus').addClass('fa-minus').removeClass('fa-plus');
        } else {
            $(obj).addClass("inactive-children").slideUp();
            $(this).find('.fa-minus').addClass('fa-plus').removeClass('fa-minus');
        }
    });

    //Tooltip
    $("[data-toggle=tooltip]").tooltip({
        placement: 'right'
    });

    //Countdown
    $('#clock').countdown('2017/08/13', function(event) {
        var $this = $(this).html(event.strftime(''

            + '<span>%-D <p class="clock"> day%!D </p></span>' + '<span >%H <p class="clock"> hour%!D</p></span> ' + '<span>%M <p class="clock"> minute%!D</p></span> ' + '<span>%S <p class="clock"> second%!D</p></span>'));
    });

    //Placeholder Plugin Settings
    $('input, textarea, select, email, password').placeholder();
});
