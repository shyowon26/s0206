window.__ = (text) => text;

function addScript(container, s_URL, runOnLoad, funcToRun, text) {
    const scriptNode = document.createElement('script');
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';
    if (runOnLoad) scriptNode.addEventListener("load", runOnLoad, false);

    const targ = document.querySelector(container);
    if (targ) targ.appendChild(scriptNode);
}

function changeLocale(lang) {
    $.i18n().locale = lang;
    $.i18n().load(g5_url + '/data/locale/js/' + lang + '.json', lang).done(function() {
        $('html').i18n();
        window.__ = $.i18n; //  global 등록
    });
}


// 쿠키 입력
function set_cookie(name, value, expirehours, domain) {
    var today = new Date();
    today.setTime(today.getTime() + (60 * 60 * 1000 * expirehours));
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name) {
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i = 0; i <= document.cookie.length; i++) {
        start = i;
        end = start + name.length;

        if (document.cookie.substring(start, end) == name) {
            find_sw = true
            break
        }
    }

    if (find_sw == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if (end < start)
            end = document.cookie.length;

        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

// 쿠키 지움
function delete_cookie(name) {
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if (value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

function youtubeUrlParser(url) {

    var timeToSec = function(str) {
        var sec = 0;
        if (/h/.test(str)) {
            sec += parseInt(str.match(/(\d+)h/, '$1')[0], 10) * 60 * 60;
        }
        if (/m/.test(str)) {
            sec += parseInt(str.match(/(\d+)m/, '$1')[0], 10) * 60;
        }
        if (/s/.test(str)) {
            sec += parseInt(str.match(/(\d+)s/, '$1')[0], 10);
        }
        return sec;
    };

    var videoId = /^https?\:\/\/(www\.)?youtu\.be/.test(url) ? url.replace(/^https?\:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/, "$2") : url.replace(/.*\?v\=([\w-]{11}).*/, "$1");
    var videoStartTime = /[^a-z]t\=/.test(url) ? url.replace(/^.+t\=([\dhms]+).*$/, '$1') : 0;
    var videoStartSeconds = videoStartTime ? timeToSec(videoStartTime) : 0;
    var videoShowRelated = ~~/rel\=1/.test(url);
    videoShowRelated = 0;

    return {
        id: videoId,
        startString: videoStartTime,
        startSeconds: videoStartSeconds,
        showRelated: videoShowRelated
    };

}

function createVideo(url, width, height, controls) {
    if (!width) width = 1920;
    if (!height) height = 1080;
    if (!controls) controls = 1;
    var video = youtubeUrlParser(url);

    var frameHtml = '<iframe src="https://www.youtube.com/embed/' + video.id + '?' + (video.startSeconds ? 'start=' + video.startSeconds + '&amp;' : '') + 'enablejsapi=1&amp;autohide=1&amp;color=white&amp;controls=' + controls + '&amp;playsinline=1&amp;rel=' + video.showRelated + '&amp;autoplay=true&amp;showinfo=0&amp;theme=light&amp;wmode=transparent" width="' + width + '" height="' + height + '" allowfullscreen></iframe>';
    return frameHtml;
}

function kakaolink_send(title, description, image) {
    if (!window.kakaoShareLoaded) {
        alertOpen_skin('카카오 서버와 연결중입니다. 잠시후에 다시 시도해 주세요.');
        return false;
    }
    if (!g5_url || !site_name || (!is_offical && !is_preview)) {
        //alertOpen_skin('미리보기에서는 사용하실 수 없습니다.')
        //return false;
        site_name = "test";
    }

    if (image === undefined) {
        image = '';
    }

    // 카카오톡 링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
    const navLink = encodeURIComponent($(".btnNav a").attr("href"));
    //console.log( g5_url+'/gotoNav.php?url='+navLink );

    Kakao.Link.sendCustom({
        templateId: 91238,
        templateArgs: {
            TITLE: title,
            DESCRIPTION: description,
            IMAGE_URL: image,
            IMAGE_WIDTH: 400,
            IMAGE_HEIGHT: 800,
            INVITATION_URL: site_name,
            ROUTE_URL: 'gotoNav.php?url=' + navLink
        }
    });
}


function getParameter(mb) {
    var nurl = window.location.search.substring(1);
    var words = nurl.split('&');
    for (var i = 0; i < words.length; i++) {
        var mbkey = words[i].split('=');
        if (mbkey[0] == mb) return mbkey[1];
    }
};

window.addEventListener("load", () => {
    if (locale) {
        changeLocale(locale);
    }
});