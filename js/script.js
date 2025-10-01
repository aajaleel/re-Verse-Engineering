(function ($) {

  "use strict";

  var init_slider = function() {
    // Nav Swiper (thumbnails for banner)
    var nav_swiper = new Swiper(".swiper.banner-nav-slider", {
      slidesPerView: "auto",
      spaceBetween: 10,
    });
    
    // Banner swiper (main text slides)
    var banner_swiper = new Swiper(".swiper.banner-slider", {
      slidesPerView: 1,
      loop: true,               
      speed: 900,               
      autoplay: {
        delay: 7000,            
        disableOnInteraction: false, 
      },
      thumbs: {
        swiper: nav_swiper,
      },
    });
    
    // Background image swiper
    var image_slider = new Swiper(".swiper.image-slider", {
      slidesPerView: 1,
      loop: true,               // ✅ keep looping
      speed: 900,
      autoplay: {
        delay: 7000,            // match banner swiper
        disableOnInteraction: false,
      },
    });
    
    // Keep images synced with banner slides
    banner_swiper.on('slideChange', function() {
      image_slider.slideToLoop(banner_swiper.realIndex); 
    });

    // Portfolio Slider
    var portfolioSwiper = new Swiper(".portfolio-Swiper", {
      slidesPerView: 4,
      loop: true,               // ✅ keep looping
      autoplay: {
        delay: 5000,            // rotate portfolio items every 5s
        disableOnInteraction: false,
      },
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  // Animate Text
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 300;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = [];

      $.each(words, function(key, value) {
        newstr = '<span class="word">';
        for (var i = 0; i < value.length; i++) {
          newstr += "<span class='letter' style='transition-delay:" + (delay + stagger * count) + "ms;'>" + value[i] + "</span>";
          count++;
        }
        newstr += '</span>';
        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:" + delay + "ms;'>&nbsp;</span>");
    });
  }

  // Isotope init
  var initIsotope = function() {
    $('.grid').each(function() {
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({
        itemSelector: '.portfolio-item',
        filter: filterValue
      });

      // filter click
      $('.button-group').on('click', 'a', function(e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      // toggle active class
      $buttonGroup.on('click', 'a', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });
  }

  // Chocolat Lightbox
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    });
  }

  $(document).ready(function () {
    init_slider();
    initTextFx();
    initChocolat();
    initIsotope();

    // Mobile menu toggle
    $('.menu-btn').click(function(e){
      $('body').toggleClass('nav-active');
    });

    AOS.init({
      duration: 1200,
    });
  });

  // Preloader
  $(window).on("load", function() {
    $('body').addClass('loaded');
    initIsotope();
  });

})(jQuery);
