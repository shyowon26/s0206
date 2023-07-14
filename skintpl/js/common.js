var JT = {};
JT.smoothscroll = {
    passive: function() {
        var supportsPassive = false;
        try {
            document.addEventListener("test", null, {
                get passive() {
                    supportsPassive = true
                }
            });
        } catch (e) {}
        return supportsPassive;
    },
    init: function() {
        if ($('html').hasClass('mobile') || $('html').hasClass('mac') || $('html').hasClass('ff')) return;
        if ($(window).width() < 1280) {
            return;
        }

        //this.passive = true ;
        // console.log(this.passive())
        var $window = $(window);
        var scrollTime = 1;
        var distance_offset = 2.5;
        var scrollDistance = $window.height() / distance_offset;

        if (this.passive()) {
            console.log('passive');
            window.addEventListener("wheel", this.scrolling, {
                passive: false
            });
        } else {
            console.log('not passive');
            $window.on("mousewheel DOMMouseScroll", this.scrolling);
        }
    },
    destroy: function() {
        //window.removeEventListener("mousewheel DOMMouseScroll");
        if (this.passive()) {
            // console.log('destroy passive');
            window.removeEventListener("wheel", this.scrolling);
        } else {
            // console.log('destroy not passive');
            $(window).off("mousewheel DOMMouseScroll", this.scrolling);
        }
        TweenMax.killChildTweensOf($(window), {
            scrollTo: true
        });
    },
    scrolling: function(event) {
        event.preventDefault();

        var $window = $(window);
        var scrollTime = 1;
        var distance_offset = 2.5;

        // debug custom param for intro page
        // TODO : make options
        if ($('#introduce-menu').length > 0) {
            scrollTime = 1;
            distance_offset = 4.5;
        }

        var scrollDistance = $window.height() / distance_offset;
        var delta = 0;

        if (JT.smoothscroll.passive()) {
            //console.log('----111------');
            //console.log(event);
            //delta = event.wheelDelta/120 || -event.originalEvent.detail/3;
            delta = event.wheelDelta / 120 || -event.deltaY / 3;
        } else {
            if (typeof event.originalEvent.deltaY != "undefined") {
                //console.log('----222------');
                //console.log(event.originalEvent);
                delta = -event.originalEvent.deltaY / 120;
            } else {
                //console.log('----333------');
                //console.log(event.originalEvent);
                delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            }
        }

        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo: {
                y: finalScroll,
                autoKill: true
            },
            ease: Power3.easeOut,
            overwrite: 5
        });
    }
};
JT.smoothscroll.init();

//얼럿
function alertOpen_skin(idx) {
    $('.alertPop .title').html(idx);
    $('.alertPop').fadeIn('fast');
}

function alertClose_skin() {
    $('.alertPop').fadeOut('fast');
}

// 카운트다운
var today = new Date();

function CountDownTimer(dt, id) {
    showRemaining();

    var end = moment(dt).toDate();
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = moment(new Date()).toDate();

        var distance = end - now;
        var t1 = moment(new Date());
        var t2 = moment(dt);

        if (distance < 0) {
            clearInterval(timer);

            $('.dayFull').text(0);
            $('.day1').text(0);
            $('.day2').text(0);
            $('.hour1').text(0);
            $('.hour2').text(0);
            $('.minutes1').text(0);
            $('.minutes2').text(0);
            $('.seconds1').text(0);
            $('.seconds2').text(0);
            return;
        }

        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        var dayfull = days;

        if (parseInt(days) < 10) {
            days = "0" + days;
        }
        if (parseInt(hours) < 10) {
            hours = '0' + hours;
        }
        if (parseInt(minutes) < 10) {
            minutes = '0' + minutes;
        }
        if (parseInt(seconds) < 10) {
            seconds = '0' + seconds;
        }

        var day1 = String(days).substring(0, 1);
        var day2 = String(days).substring(1, 2);
        var day3 = String(days).substring(2, 3);
        var hour1 = String(hours).substring(0, 1);
        var hour2 = String(hours).substring(1, 2);
        var minutes1 = String(minutes).substring(0, 1);
        var minutes2 = String(minutes).substring(1, 2);
        var seconds1 = String(seconds).substring(0, 1);
        var seconds2 = String(seconds).substring(1, 2);

        $('.day1').text(day1);
        $('.day2').text(day2);
        if (dayfull.toString().length > 2) {
            $('.day3').text(day3);
        } else {
            $('.day3').text("");
        }
        $('.hour1').text(hour1);
        $('.hour2').text(hour2);
        $('.minutes1').text(minutes1);
        $('.minutes2').text(minutes2);
        $('.seconds1').text(seconds1);
        $('.seconds2').text(seconds2);
    }

    timer = setInterval(showRemaining, 1000);
}

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});


var maxDuration = 2000;
var maxDelay = 100;
var minDuration = maxDuration - maxDelay;
$(document).ready(function() {
    hauntedText($('.mainVisual .tit01 .blast'), 1500);
    hauntedText($('.mainVisual .tit02 .blast'), 1500);
    hauntedText($('.mainVisual .name .blast'), 2800);

});
var getRandomValue = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
var hauntedText = function(obj, time) {
    setTimeout(function() {
        obj.each(function(i, el) {
            var $el = $(el);
            var duration = getRandomValue(minDuration, maxDuration);
            var delay = maxDuration - duration;
            var blur = getRandomValue(2, 10);

            // From
            $el.animate({
                opacity: 0,
                blur: blur
            }, {
                duration: 0
            });

            // To
            $el.delay(delay).animate({
                opacity: 1,
                blur: 0
            }, {
                duration: duration,
                ease: [250, 0]
            });
        });
    }, time);
};



$(function() {
    $(window).scrollTop(0);

    $(document).ready(function() {

        $('.mainVisual').imagesLoaded({
            background: true
        }, function() {
            $('body').addClass('mainLoad');
        });
    });

    //경험하기 iframe 대응
    var offsetArray = [];
    $(window).load(function() {
        offsetArray[0] = $('.greetingWrap').length > 0 ? $('.greetingWrap').offset().top : 0;
        offsetArray[1] = $('.dayWrap').length > 0 ? $('.dayWrap').offset().top : 0;
        offsetArray[2] = $('.galleryWrap').length > 0 ? $('.galleryWrap').offset().top : 0;
        offsetArray[3] = $('.infoWrap').length > 0 ? $('.infoWrap').offset().top : 0;
        offsetArray[4] = $('.guestBookWrap').length > 0 ? $('.guestBookWrap').offset().top : 0;
        offsetArray[5] = $('.contactWrap').length > 0 ? $('.contactWrap').offset().top : 0;
        offsetArray[6] = $('.mindWrap').length > 0 ? $('.mindWrap').offset().top : 0;
        offsetArray[7] = $('.locationWrap').length > 0 ? $('.locationWrap').offset().top : 0;
        offsetArray[8] = $('.thanksWrap').length > 0 ? $('.thanksWrap').offset().top : 0;
    });
    //메뉴이동
    $('.gnbList ul li a').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('gnbOpen');
        noScrollClear();
        moveGnb = true;

        if (!$('.wrap').hasClass('iframe')) {
            var idx = $(this).parent().index();
            switch (idx) {
                case 0:
                    winScTop = $('.greetingWrap').offset().top;
                    break;
                case 1:
                    openInterview();
                    return false;
                    break;
                case 2:
                    winScTop = $('.dayWrap').offset().top;
                    break;
                case 3:
                    winScTop = $('.galleryWrap').offset().top;
                    break;
                case 4:
                    winScTop = $('.infoWrap').offset().top;
                    break;
                case 5:
                    winScTop = $('.guestBookWrap').offset().top;
                    break;
                case 6:
                    winScTop = $('.contactWrap').offset().top;
                    break;
                case 7:
                    winScTop = $('.mindWrap').offset().top;
                    break;
                case 8:
                    winScTop = $('.locationWrap').offset().top;
                    break;
                case 9:
                    winScTop = $('.thanksWrap').offset().top;
                    break;
            }

            $('body,html').stop().animate({
                scrollTop: winScTop
            }, 500, function() {});
        } else {
            var idx = $(this).parent().index();
            switch (idx) {
                case 0:
                    winScTop = offsetArray[0];
                    break;
                case 1:
                    openInterview();
                    return false;
                    break;
                case 2:
                    winScTop = offsetArray[1];
                    break;
                case 3:
                    winScTop = offsetArray[2];
                    break;
                case 4:
                    winScTop = offsetArray[3];
                    break;
                case 5:
                    winScTop = offsetArray[4];
                    break;
                case 6:
                    winScTop = offsetArray[5];
                    break;
                case 7:
                    winScTop = offsetArray[6];
                    break;
                case 8:
                    winScTop = offsetArray[7];
                    break;
                case 9:
                    winScTop = offsetArray[8];
                    break;
            }
            $('.wrap').stop().animate({
                scrollTop: winScTop
            }, 500, function() {});
        }
    });

    // 예식장정보1
    var infoList1 = new Swiper('.infoList .swiper-container', {
        //effect: "fade",
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoHeight: true,
        //allowTouchMove : false,
        centeredSlides: true,
        speed: 200,
        loop: true,
        navigation: {
            nextEl: ".infoList .swiper-button-next",
            prevEl: ".infoList .swiper-button-prev"
        }
    });


    if ($('.infoList').length > 0 && infoList1.slides) {
        if (infoList1.slides.length - 2 == 1) {
            infoList1.destroy();
            $('.infoWrap .infoList .swiper-button-next').hide();
            $('.infoWrap .infoList .swiper-button-prev').hide();
            $('.infoWrap .infoList .slideList ul li').css('opacity', 1);
            $('.infoWrap .infoList .slideList ul li a').css('display', 'flex');
            $('.infoWrap .infoList .slideList ul li .textWrap').show();
        }
    }



    $(".infoList .tab button").click(function() {
        $(".infoList .tab button").removeClass('active');
        $(this).addClass('active');
        infoList1.slideTo($(this).index());
        infoImgChg($(this).index());
    });

    $(".infoList .btnInfo").on('click', function() {
        var activeIndex = infoList1.activeIndex + 1;
        if ($(".infoList .tab button").eq(activeIndex).length <= 0) activeIndex = 0;
        $(".infoList .tab button").removeClass('active');
        $(".infoList .tab button").eq(activeIndex).addClass('active');
        infoList1.slideTo(activeIndex);
        infoImgChg(activeIndex);
    });

    infoImgChg(0);

    function infoImgChg(i) {
        var imgSrc = '';
        imgSrc = $(".infoList .tab button").eq(i).data('img');
        $('.infoList .leftBg img, .infoList .rightBg img').attr('src', imgSrc);
    }

    //한줄 메세지
    if ($('body').hasClass('sampleCheck')) {
        $('.marqWrap').liMarquee({
            removeContentFadeDuration: 0,
            scrollAmount: 6,
            circular: true,
            startShow: true,
        });
    }

    //계좌번호 보기
    $('.mindWrap .contBox .tit').on('click', function() {
        $(this).parents('.contBox').toggleClass('active');
    });

    //링크복사
    var url = document.location.href;
    var clipboard = new ClipboardJS('.link', {
        text: function() {
            return url;
        }
    });
    clipboard.on('success', function(e) {
        alertOpen_skin('URL이 복사되었습니다.');
    });

    var clipboard4 = new ClipboardJS('.copy03');
    clipboard4.on('success', function(e) {
        alertOpen_skin('주소가 복사되었습니다.');
    });

    var bankCopy = new ClipboardJS('.bankCopy');
    bankCopy.on('success', function(e) {
        alertOpen_skin('계좌번호가 복사되었습니다.');
    });

    //인터뷰 더보기
    $('.interPop .popCont .inner .more span').click(function() {
        $('.interPop .popCont .inner .hidden').fadeIn('slow');
        $(this).parents('.more').hide();
    });

    $(window).scroll(function() {
        var idx = $(window).scrollTop();
        if (idx > 10) {
            $('.head').addClass('on');
        } else {
            $('.head').removeClass('on');
        }
    });

    //로고 클릭
    $('.h1Wrap a').on('click', function() {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    //메뉴 열기
    $('.btnMenu').click(function() {
        $('body').addClass('gnbOpen');
        $('body').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        noScrollRun();
    });
    //메뉴 닫기
    $('.btnMenuClose').click(function() {
        $('body').removeClass('gnbOpen');
        $('body').off('scroll touchmove mousewheel');
        noScrollClear();
    });


    var playBgm = document.getElementById("bgmAudio");
    //playBgm.play();
    //playBgm ? playBgm.pause() : "";
    $('.btnControl a').on('click', function(e) {
        e.preventDefault();
        $('.btnControl').toggleClass('on');
        if ($('.btnControl').hasClass('on')) {
            playBgm.play();
            $('.btnControl .pop a').text('BGM on');
        } else {
            playBgm.pause();
            playBgm.currentTime = 0;
            $('.btnControl .pop a').text('BGM off');
        }
    });

    var UserAgent = navigator.userAgent;
    var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
    var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
    if (UADevice !== null || UAVendor !== null) {
        $('html').addClass('mobile');
    }
    var agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf("chrome") != -1 && !$('html').hasClass('mobile')) {
        var weaList = '<iframe class="silence" style="width:1px; height:1px;" src="https://dddproject.com/html/images/silence.mp3" allow="autoplay"></iframe>';
        $('.wrap').append(weaList);
    } else {

    }

    // 위로가기
    $('.btnTop').on('click', function() {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 1000);
    });
    // 아래로
    $('.btnDown').on('click', function() {
        $('html,body').stop().animate({
            scrollTop: $(document).height()
        }, 1000);
    });

    //인터뷰 닫기
    $('.btnInterClose').click(function() {
        $('body').removeClass('interOpen');
        $('body').off('scroll touchmove mousewheel');
        noScrollClear();
    });

    //갤러리팝업 - 슬라이드
    var popSlide = new Swiper('.popSlide .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1100,
        pagination: {
            el: ".popSlide .swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".popSlide .swiper-button-next",
            prevEl: ".popSlide .swiper-button-prev",
        }
    });
    // 갤러리팝업 - 열기
    $(".galWrap .galList li").on('click', function(e) {
        noScrollRun();
        $('body').addClass('showSlide');
        $('body').on('scroll touchmove mousewheel', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        var slideActive = $(this).attr("slide-num");
        popSlide.update();
        popSlide.slideTo(slideActive, 0);
    });
    // 갤러리팝업 -  닫기
    $(".popSlide .closeSlide").click(function() {
        noScrollClear();
        $('body').removeClass('showSlide');
        $('body').off('scroll touchmove mousewheel');
    });

    //위치접근
    $('.greetingWrap').waypoint(function(direction) {
        $('.greetingWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.dayWrap').waypoint(function(direction) {
        $('.dayWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.galleryWrap').waypoint(function(direction) {
        $('.galleryWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.infoWrap').waypoint(function(direction) {
        $('.infoWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.guestBookWrap').waypoint(function(direction) {
        $('.guestBookWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.contactWrap').waypoint(function(direction) {
        $('.contactWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.mindWrap').waypoint(function(direction) {
        $('.mindWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.locationWrap').waypoint(function(direction) {
        $('.locationWrap').addClass('atm');
    }, {
        offset: '50%'
    });
    $('.thanksWrap').waypoint(function(direction) {
        $('.thanksWrap').addClass('atm');
    }, {
        offset: '60%'
    });

    DADIDAN.init();

});

// 갤러리 더보기
function morePic() {
    $('.hiddenList').show();
    $('.galleryWrap .more').hide();
}

//인터뷰 열기
function openInterview() {
    $('.interPop').scrollTop(0);
    $('body').addClass('interOpen');
    $('body').on('scroll touchmove mousewheel', function(event) { // 터치무브와 마우스휠 스크롤 방지     
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    noScrollRun();
}

//유투브 영상
function youtubeOpen(src) {
    var playBgm = document.getElementById("bgmAudio");
    var youtubeSrc = '<div class="videoBox"><iframe width="100%" src="https://www.youtube-nocookie.com/embed/' + src + '?autoplay=1&rel=0&vq=hd1080&playlist=' + src + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"  allowfullscreen></iframe></div>';
    $('.inFrame').append(youtubeSrc);
    if (playBgm) {
        playBgm.pause();
        playBgm.currentTime = 0;
    }
    $('.btnControl .pop a').text('BGM off');
    $('.btnControl').removeClass('on');
    $('.videoGal .videoWrap .btnMovieClose').fadeIn(200);
    noScrollRun();
    $('body').addClass('showYoutube');
}
//유투브 영상 닫기
function videoClose(src) {
    $('.inFrame').empty();
    $('.btnControl').removeClass('on');
    $('.videoGal .videoWrap .btnMovieClose').hide();
    noScrollClear();
    $('body').removeClass('showYoutube');
}

var posY;

function noScrollRun() {
    posY = $(window).scrollTop();
    $('body').addClass('noScroll');
    $(".wrap").css("top", -posY);
}

function noScrollClear() {
    $('body').removeClass('noScroll');
    posY = $(window).scrollTop(posY);
    $(".wrap").attr("style", "");
}

// 다디단
var DADIDAN = (function() {
    var $wrap = $('.wrap'),
        controller,
        moveFlag = false;

    var posx;
    var posy;
    var pos_val1 = 0,
        pos_val2 = 0,
        pos_val3 = 0,
        pos_val4 = 0,
        pos_val5 = 0,
        pos_val6 = 0,
        pos_val7 = 0,
        wH = $(window).height();

    var random = function random(min, max) {
        return Math.round(min + Math.random() * (max - min));
    };
    var posXArr = [],
        posYArr = [];
    var myTimer;

    function init() {
        setTimerMot(pos_val1, 0, 8, 1600);
        setTimerMot(pos_val2, 6, 3.5, 4200);
        setTimerMot(pos_val3, 3, 5.6, 8000);
        setTimerMot(pos_val4, 2, 2.2, 7600);
        setTimerMot(pos_val5, 5, 4.4, 12600);
        setTimerMot(pos_val6, 1, 1.2, 6500);
        setTimerMot(pos_val7, 4, 5.0, 3000);
    }

    function setTimerMot(pos_val, i, time1, time2) {
        myTimer = setTimeout(function() {
            randomPos();
            posXArr.push(posx);
            posYArr.push(posy);
            var ranNum = random(0, 5);
            $('.leafOb').eq(i).css({
                'top': posy
            });
            TweenMax.fromTo($('.leafOb').eq(i), 10, {
                x: -50,
                rotation: -6 * ranNum
            }, {
                x: 50,
                delay: 0.2 * i,
                rotation: 6 * ranNum,
                repeat: -1,
                yoyo: true,
                ease: Power2.easeInOut
            }, {
                delay: 220 * i
            });
            TweenMax.to($('.leafOb').eq(i), 0.8, {
                autoAlpha: 1,
                delay: 0.4 * i
            });

            setIntervalMot(pos_val, i, time1);
            clearTimeout(myTimer);
        }, time2);
    }

    function setIntervalMot(_val, _idx, time) {
        $('.leafOb').eq(_idx).hide();
        setInterval(function() {
            _val += 1;
            $('.leafOb').eq(_idx).show();
            if (_val >= wH) {
                _val = 0;

                $('.leafOb').eq(_idx).hide();
                randomPos();
            }

            $('.leafOb').eq(_idx).css({
                top: _val
            });
        }, time * 100);
    }

    function randomPos() {
        var divsize = (Math.random() * 50).toFixed();

        posx = Number((Math.random() * ($(window).width() - divsize)).toFixed());
        posy = Number((Math.random() * ($(window).height() - divsize)).toFixed());
    }

    return {
        init: init
    }

}());


// var DADIDAN = (function(){
//     var $wrap = $('.wrap'),
//         controller,
//         moveFlag = false;

//     var posx;
//     var posy;
//     var pos_val1= 0, pos_val2= 0, pos_val3= 0, pos_val4= 0, pos_val5= 0,
//          wH = $(window).height();

//     var random = function random(min, max){
//         return Math.round(min + Math.random()*(max-min));
//     };
//     var posXArr=[],
//          posYArr=[];
//     var myTimer;

//     function init(){
//         setTimerMot(pos_val1,0,1.1,40000);
//         setTimerMot(pos_val2,1,1.1,15000);
//         setTimerMot(pos_val3,2,1.1,5000);
//         setTimerMot(pos_val4,3,1.1,60000);
//         setTimerMot(pos_val5,4,1.1,25000);
//         /*
//          setTimerMot(pos_val1,0,1.8,15000);
//         setTimerMot(pos_val2,1,1.1,8600);
//         setTimerMot(pos_val3,2,0.9,600);
//         setTimerMot(pos_val4,3,3,10000);
//         setTimerMot(pos_val5,4,1.9,900);
//          * */
//     }

//     function setTimerMot(pos_val,i,time1,time2){
// 		myTimer = setTimeout(function() {
// 		  	randomPos();
// 	        posXArr.push(posx);
// 	        posYArr.push(posy);
// 	        var ranNum = random(0,5);
// 	       	$('.fixPetalWrap .obj').eq(i).css({'top':posy});
// 	        TweenMax.fromTo($('.fixPetalWrap .obj').eq(i),10,{x:-20,rotation:-7*ranNum},{x:20,delay:0.2*i,rotation:7*ranNum,repeat: -1,yoyo: true,ease: Power2.easeInOut},{delay:220*i});
// 	        TweenMax.to($('.fixPetalWrap .obj').eq(i),0.8,{autoAlpha:1,delay:0.4*i});

// 	        setIntervalMot(pos_val,i,time1);
// 	        //clearTimeout(myTimer);
// 		}, time2);
//     }

//     function setIntervalMot(_val,_idx,time){
//         $('.fixPetalWrap .obj').eq(_idx).hide();
//         setInterval(function(){
//             _val += 1;
//             $('.fixPetalWrap .obj').eq(_idx).show();
//             if (_val >= wH){
//                 _val = 0;

//                 $('.fixPetalWrap .obj').eq(_idx).hide();
//                 randomPos();
//             }

//             $('.fixPetalWrap .obj').eq(_idx).css({top:_val});
//         },time*100);
//     }

//     function randomPos(){
//         var divsize = (Math.random()*50).toFixed();

//         posx = Number((Math.random() * ($(window).width() - divsize)).toFixed());
//         posy = Number((Math.random() * ($(window).height() - divsize)).toFixed());
//     }

//     return {
//        init : init
//     }

// }());

// 이미지팝업 열기/닫기 hammer.zoom.js

//공통팝업
function basePopOpen(idx) {
    $(idx).fadeIn('fast');
}

function basePopClose(idx) {
    $(idx).fadeOut('fast');
}