//스크롤 방지
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


//참석여부
function visitOpen() {
    $('body').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    noScrollRun();
    $('.visitPop').fadeIn('fast');
    setTimeout(visitPrev, 500);
}

function visitClose() {
    $('body').off('scroll touchmove mousewheel');
    noScrollClear()
    $('.visitPop').fadeOut('fast');
    setTimeout(visitPrev, 500);
}

//참석여부완료
function visitPopLastOpen() {
    if (!$("#agreeVisit").prop("checked")) {
        alertOpen_skin(__('개인정보 수집 및 이용에 동의해주세요'));
        return false;
    }
    var data = $("#form_rsvp").serialize();
    data += '&site_name=' + site_name;
    $.ajax({
        method: 'POST',
        url: g5_url + '/plugin/tpl/ajax.rsvp_update.php',
        data: data,
        dataType: 'json',
        beforeSend: function() {
            document.querySelector('#btnSubmitRsvp').disabled = true;
        },
        success: function(data) {
            if (data.error && !data.count) {
                alertOpen_skin(data.error);
                return false;
            } else {
                document.form_rsvp.reset();
                visitClose();
                $('.visitPopLast').fadeIn('fast');
            }
        },
        error: function(req) {
            alertOpen_skin(__('참석여부 전달 요청이 중단되었습니다.\n새로고침 후 다시 한 번 시도해주세요.'));
            console.log('error', req);
        },
        complete: function() {
            document.querySelector('#btnSubmitRsvp').disabled = false;
        },
        timeout: 4000
    });
    return false;

}

function visitPopLastClose() {
    $('body').off('scroll touchmove mousewheel');
    $('.visitPopLast').fadeOut('fast');
}


//참석여부안내팝업
function visitInfoOpen() {
    noScrollRun()
    $('.visitInfoPop').fadeIn('fast');

}

function visitInfoClose() {
    noScrollClear()
    $('.visitInfoPop').fadeOut('fast');
}

//참석여부 다음
function visitNext() {
    $('.visitPop .left').hide();
    $('.visitPop .right').show();
}


//참석여부 이전
function visitPrev() {
    $('.visitPop .left').show();
    $('.visitPop .right').hide();
}

window.addEventListener("load", () => {
    document.querySelectorAll("input[name='rv_visit']").forEach(el => {
        el.addEventListener("click", (event) => {
            const $addRsvpList = document.querySelectorAll(".addRsvpList");
            const $addRsvpListPoll = document.querySelectorAll(".addRsvpListPoll");
            const $rv_person_tr = document.querySelectorAll(".rv_person_tr");
            const $rv_person_together_tr = document.querySelectorAll(".rv_person_together_tr");
            if (event.target.value == "1") {
                $addRsvpList.forEach(el => el.style.display = "block");
                $addRsvpListPoll.forEach(el => el.style.display = "block");
                $rv_person_tr.forEach(el => {
                    el.querySelector("th").style.display = "";
                    el.querySelector("td").style.display = "";
                });
                $rv_person_together_tr.forEach(el => {
                    el.querySelector("th").style.display = "";
                    el.querySelector("td").style.display = "";
                });
            } else {
                $addRsvpList.forEach(el => {
                    if (el.querySelector("input[name='require_type']").value == "visitor") {
                        el.style.display = "none";
                    }
                });
                $addRsvpListPoll.forEach(el => el.style.display = "none");
                $rv_person_tr.forEach(el => {
                    el.querySelector("th").style.display = "none";
                    el.querySelector("td").style.display = "none";
                });
                $rv_person_together_tr.forEach(el => {
                    el.querySelector("th").style.display = "none";
                    el.querySelector("td").style.display = "none";
                });
            }
        });
    });
});

function doRsvpSubmitBtn() {
    if (!confirm('참석여부를 전달하시겠습니까?')) return false;
    //document.querySelector('#btnSubmitRsvp').click();

    if (!$("#agreeVisit").prop("checked")) {
        alertOpen_skin(__('개인정보 수집 및 이용에 동의해주세요'));
        return false;
    }
    var data = $("#form_rsvp").serialize();
    data += '&site_name=' + site_name;
    $.ajax({
        method: 'POST',
        url: g5_url + '/plugin/tpl/ajax.rsvp_update.php',
        data: data,
        dataType: 'json',
        success: function(data) {
            if (data.error && !data.count) {
                alertOpen_skin(data.error);
                return false;
            } else {
                document.form_rsvp.reset();
                visitClose();
                $('.visitPopLast').fadeIn('fast');
            }
        },
        error: function(req) {
            alertOpen_skin(__('참석여부 전달 요청이 중단되었습니다.\n새로고침 후 다시 한 번 시도해주세요.'));
            console.log('error', req);
        }
    });
}