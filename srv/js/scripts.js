$(document).ready(function() {
	
	"use strict";

    // Use Enquire to load and distroy scripts for desktop and mobile
    var e = $(window),
        n = {
            mobileDown: "screen and (max-width: 768px)",
            tabletDown: "screen and (max-width: 991px)",
            desktop: "screen and (min-width: 991px)"
        };
    window.FastClick.attach(document.body), enquire.register(n.desktop, function() {
        alignVertical();
        e.stellar({
            verticalScrolling: true,
            verticalOffset: false,
            horizontalScrolling: false,
            responsive: true,
            scrollProperty: "scroll",
            positionProperty: "transform",
            parallaxBackgrounds: true,
            parallaxElements: true,
            hideDistantElements: false
        });
        
    }).register(n.tabletDown, function() {
        e.stellar("destroy"),
        $("[data-stellar-ratio]").removeAttr("style");
    }).register(n.mobileDown, function() {
    })

    //Resize stuff on document load and window resize
    resize_top_left_triangle();
    resize_top_right_triangle();
    resize_bottom_right_triangle();
    resize_top_left_small_triangle();
    setTimeout(
    function() {
        resize_account_forms();
    }, 50);

    $(window).resize(function() {
        resize_top_left_triangle();
        resize_top_right_triangle();
        resize_bottom_right_triangle();
        resize_top_left_small_triangle();
        resize_account_forms();
    })

    $('#navigation').slimmenu({
        resizeWidth: '992',
        collapserTitle: '',
        animSpeed: 'medium',
        easingEffect: null,
        indentChildren: false,
        indentChildren: true,
        childrenIndenter: '&nbsp;&nbsp;'
    });

    //Products carousel on home
    if ($('.products-carousel').length) {
        $(".products-carousel").owlCarousel({
            loop:true,
            responsiveClass:true,
            nav:false,
            dots:true,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:2,
                },
                1000:{
                    items:3,
                }
            }
        });
    }

    //Secondary images for product single
    if ($('.secundary-images').length) {
        $('.secundary-images').owlCarousel({
            loop:true,
            responsiveClass:true,
            nav:false,
            dots:true,
            responsive:{
                0:{
                    items:2,
                },
                600:{
                    items:3,
                },
                1000:{
                    items:3,
                }
            }
        });
    }

    //Change the main image on secondary image click
    if ($('.secundary-images').length) {
        $('.secundary-images').on('click', 'a', function(e) {
            var this_image = $(this).find('img').attr('src'),
                main_image = $('.product .image img');
            main_image.attr('src', this_image);
            return false;
        });
    }

    //Offer slider on login and register
    if ($('.account-offer-slider').length) {
        $('.account-offer-slider').owlCarousel({
            loop:true,
            responsiveClass:true,
            nav:false,
            dots:true,
            items: 1
        });
    }

    //Instagram feed and carousel (simply scroll)
    if ($('#instafeed').length) {
        var feed = new Instafeed({
            get: "user",
            userId: 207642893,
            limit: 20,
            accessToken: "2270218888.cf0499d.f0939b7decfa4a7da0e864bda30d1a23",
            resolution: "thumbnail",
            after: function() {
                $("#instafeed").simplyScroll({
                    speed: 3,
                    frameRate: 25,
                    auto: false,
                    orientation: "horizontal",
                    direction: "forwards",
                    customClass: "instagram_scroller"
                });
            }
        });
        feed.run();
    }   

    // Google maps
    if ($('#map').length) {
        google.maps.event.addDomListener(window, 'load', initialize_map('#map'));
    }

    //Remove loader after all scripts have been loaded
    remove_loader();

});

//Helper Functions

function resize_top_left_triangle() {
    var r = $( window ).width();
    $('.triangle--top-left').css({ 
        borderWidth: "420px 0 0 " + r + "px"
    });
}

function resize_top_left_small_triangle() {
    var r = $( window ).width();
    $('.triangle--top-left-small').css({ 
        borderWidth: "50px 0 0 " + r + "px"
    });
}

function resize_top_right_triangle() {
    var r = $( window ).width();
    $('.triangle--top-right').css({ 
        borderWidth: "0 0 40px " + r + "px"
    });
}

function resize_bottom_right_triangle() {
    var r = $( window ).width();
    $('.triangle--bottom-right').css({ 
        borderWidth: "0 " + r + "px 40px 0px"
    });
}

function alignVertical() {

	$('.align-vertical').each(function(){
		var that = $(this);
			height = that.height(),
			parentHeight = that.parent().height(),
			padAmount = (parentHeight / 2) - (height/2);
		
		that.css('padding-top', padAmount);
	});
}

function remove_loader() {
    $('.loader').remove();
}

function initialize_map(id) {

    var latitude = $(id).data('lat'),
        longitude = $(id).data('long');
    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        panControl: false,
        zoomControl: false,
        scaleControl: false,
        disableDefaultUI: true,
        center: new google.maps.LatLng(latitude, longitude)
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.set('styles', [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]);


    var image = 'images/marker.png';
    var myLatLng = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}

function resize_account_forms() {
    var account_slider_h = $('.account-offer-slider').height(),
        login_form_h = $('.login-form').height();
    
        $('.login-form').css('height', account_slider_h+60);
   
}