$(document).ready(function() {

    $(document).on('click', '.btnRb .tit span,.rbPop .close,.mobOpen', function() {
        $('body').toggleClass('rbActive');
        if ($('body').hasClass('rbActive')) {
            thumbTbSlide.autoplay.stop();
        } else {
            thumbTbSlide.autoplay.start();
        }
    })

    if ($('.thumbTbSlide li').length > 1) {
        thumbTbSlide = new Swiper('.thumbTbSlide .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbThumbNext',
                prevEl: '.rbThumbPrev',
            },
            observer: true,
            observeParents: true,
            autoplay: {
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },

        });


        rbSwiper = new Swiper('.rbSlide .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            loop: true,
            navigation: {
                nextEl: '.rbNext',
                prevEl: '.rbPrev',
            },
            observer: true,
            observeParents: true,
        });

        $('.rbWrap .numTotal').text($('.thumbTbSlide .swiper-slide:not(.swiper-slide-duplicate)').length)

        thumbTbSlide.on('slideChange', function(e) {
            $('.rbWrap .chNum').text(Number(thumbTbSlide.slides.eq(thumbTbSlide.activeIndex).attr('data-swiper-slide-index')) + 1);
            rbSwiper.slideTo(thumbTbSlide.activeIndex)
        });

        rbSwiper.on('slideChange', function(a, b, c) {
            thumbTbSlide.slideTo(rbSwiper.activeIndex)
        });


    } else {
        $('.rbWrap').addClass('arrowNone');
    }


});

$(window).load(function() {



    if ($(window).width() > 1025 && $(".mCustom").length > 0) {
        var mCustom = $(".mCustom").mCustomScrollbar({
            theme: "minimal"
        });
    }


})