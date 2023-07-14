//"use strict";let imageUrl=document.querySelector(".zoomImg").getAttribute("src"),imageContainer=document.querySelector(".imageContainer");let imageWidth,imageHeight,containerWidth,containerHeight,displayDefaultWidth,displayDefaultHeight,minScale=1,maxScale=4,displayImageX=0,displayImageY=0,displayImageScale=1,rangeX=0,rangeMaxX=0,rangeMinX=0,rangeY=0,rangeMaxY=0,rangeMinY=0,displayImageRangeY=0,displayImageCurrentX=0,displayImageCurrentY=0,displayImageCurrentScale=1;function resizeContainer(){containerWidth=imageContainer.offsetWidth,containerHeight=imageContainer.offsetHeight,void 0!==displayDefaultWidth&&void 0!==displayDefaultHeight&&(displayDefaultWidth=displayImage.offsetWidth,displayDefaultHeight=displayImage.offsetHeight,updateRange(),displayImageCurrentX=clamp(displayImageX,rangeMinX,rangeMaxX),displayImageCurrentY=clamp(displayImageY,rangeMinY,rangeMaxY),updateDisplayImage(displayImageCurrentX,displayImageCurrentY,displayImageCurrentScale))}function clamp(a,e,i){return Math.min(Math.max(e,a),i)}function clampScale(a){return clamp(a,minScale,maxScale)}resizeContainer(),window.addEventListener("resize",resizeContainer,!0);const displayImage=new Image;function updateDisplayImage(a,e,i){const n="translateX("+a+"px) translateY("+e+"px) translateZ(0px) scale("+i+","+i+")";displayImage.style.transform=n,displayImage.style.WebkitTransform=n,displayImage.style.msTransform=n}function updateRange(){rangeX=Math.max(0,Math.round(displayDefaultWidth*displayImageCurrentScale)-containerWidth),rangeY=Math.max(0,Math.round(displayDefaultHeight*displayImageCurrentScale)-containerHeight),rangeMaxX=Math.round(rangeX/2),rangeMinX=0-rangeMaxX,rangeMaxY=Math.round(rangeY/2),rangeMinY=0-rangeMaxY}displayImage.src=imageUrl,displayImage.onload=function(){imageWidth=displayImage.width,imageHeight=displayImage.height,imageContainer.innerHTML="",imageContainer.appendChild(displayImage),displayImage.addEventListener("mousedown",a=>a.preventDefault(),!1),displayDefaultWidth=displayImage.offsetWidth,displayDefaultHeight=displayImage.offsetHeight,rangeX=Math.max(0,displayDefaultWidth-containerWidth),rangeY=Math.max(0,displayDefaultHeight-containerHeight)},imageContainer.addEventListener("wheel",a=>{displayImageScale=displayImageCurrentScale=clampScale(displayImageScale+a.wheelDelta/800),updateRange(),displayImageCurrentX=clamp(displayImageCurrentX,rangeMinX,rangeMaxX),displayImageCurrentY=clamp(displayImageCurrentY,rangeMinY,rangeMaxY),updateDisplayImage(displayImageCurrentX,displayImageCurrentY,displayImageScale)},!1);const hammertime=new Hammer(imageContainer);hammertime.get("pinch").set({enable:!0}),hammertime.get("pan").set({direction:Hammer.DIRECTION_ALL}),hammertime.on("pan",a=>{displayImageCurrentX=clamp(displayImageX+a.deltaX,rangeMinX,rangeMaxX),displayImageCurrentY=clamp(displayImageY+a.deltaY,rangeMinY,rangeMaxY),updateDisplayImage(displayImageCurrentX,displayImageCurrentY,displayImageScale)}),hammertime.on("pinch pinchmove",a=>{displayImageCurrentScale=clampScale(a.scale*displayImageScale),updateRange(),displayImageCurrentX=clamp(displayImageX+a.deltaX,rangeMinX,rangeMaxX),displayImageCurrentY=clamp(displayImageY+a.deltaY,rangeMinY,rangeMaxY),updateDisplayImage(displayImageCurrentX,displayImageCurrentY,displayImageCurrentScale)}),hammertime.on("panend pancancel pinchend pinchcancel",()=>{displayImageScale=displayImageCurrentScale,displayImageX=displayImageCurrentX,displayImageY=displayImageCurrentY});

function openImg(val) {
    $('.popImg img:eq(0)').attr('src', val);
    $('.popImg .btnDownload').attr('href', val);

    const imageUrl = val,
        imageContainer = document.querySelector(".imageContainer");
    let imageWidth, imageHeight, containerWidth, containerHeight, displayDefaultWidth, displayDefaultHeight, minScale = 1,
        maxScale = 4,
        displayImageX = 0,
        displayImageY = 0,
        displayImageScale = 1,
        rangeX = 0,
        rangeMaxX = 0,
        rangeMinX = 0,
        rangeY = 0,
        rangeMaxY = 0,
        rangeMinY = 0,
        displayImageRangeY = 0,
        displayImageCurrentX = 0,
        displayImageCurrentY = 0,
        displayImageCurrentScale = 1;

    function resizeContainer() {
        containerWidth = imageContainer.offsetWidth, containerHeight = imageContainer.offsetHeight, void 0 !== displayDefaultWidth && void 0 !== displayDefaultHeight && (displayDefaultWidth = displayImage.offsetWidth, displayDefaultHeight = displayImage.offsetHeight, updateRange(), displayImageCurrentX = clamp(displayImageX, rangeMinX, rangeMaxX), displayImageCurrentY = clamp(displayImageY, rangeMinY, rangeMaxY), updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageCurrentScale))
    }

    function clamp(a, e, i) {
        return Math.min(Math.max(e, a), i)
    }

    function clampScale(a) {
        return clamp(a, minScale, maxScale)
    }
    resizeContainer(), window.addEventListener("resize", resizeContainer, !0);
    const displayImage = new Image;

    function updateDisplayImage(a, e, i) {
        const n = "translateX(" + a + "px) translateY(" + e + "px) translateZ(0px) scale(" + i + "," + i + ")";
        displayImage.style.transform = n, displayImage.style.WebkitTransform = n, displayImage.style.msTransform = n
    }

    function updateRange() {
        rangeX = Math.max(0, Math.round(displayDefaultWidth * displayImageCurrentScale) - containerWidth), rangeY = Math.max(0, Math.round(displayDefaultHeight * displayImageCurrentScale) - containerHeight), rangeMaxX = Math.round(rangeX / 2), rangeMinX = 0 - rangeMaxX, rangeMaxY = Math.round(rangeY / 2), rangeMinY = 0 - rangeMaxY
    }
    displayImage.src = imageUrl, displayImage.onload = function() {
        imageWidth = displayImage.width, imageHeight = displayImage.height, imageContainer.innerHTML = "", imageContainer.appendChild(displayImage), displayImage.addEventListener("mousedown", a => a.preventDefault(), !1), displayDefaultWidth = displayImage.offsetWidth, displayDefaultHeight = displayImage.offsetHeight, rangeX = Math.max(0, displayDefaultWidth - containerWidth), rangeY = Math.max(0, displayDefaultHeight - containerHeight)
    }, imageContainer.addEventListener("wheel", a => {
        displayImageScale = displayImageCurrentScale = clampScale(displayImageScale + a.wheelDelta / 800), updateRange(), displayImageCurrentX = clamp(displayImageCurrentX, rangeMinX, rangeMaxX), displayImageCurrentY = clamp(displayImageCurrentY, rangeMinY, rangeMaxY), updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageScale)
    }, !1);
    const hammertime = new Hammer(imageContainer);
    hammertime.get("pinch").set({
        enable: !0
    }), hammertime.get("pan").set({
        direction: Hammer.DIRECTION_ALL
    }), hammertime.on("pan", a => {
        displayImageCurrentX = clamp(displayImageX + a.deltaX, rangeMinX, rangeMaxX), displayImageCurrentY = clamp(displayImageY + a.deltaY, rangeMinY, rangeMaxY), updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageScale)
    }), hammertime.on("pinch pinchmove", a => {
        displayImageCurrentScale = clampScale(a.scale * displayImageScale), updateRange(), displayImageCurrentX = clamp(displayImageX + a.deltaX, rangeMinX, rangeMaxX), displayImageCurrentY = clamp(displayImageY + a.deltaY, rangeMinY, rangeMaxY), updateDisplayImage(displayImageCurrentX, displayImageCurrentY, displayImageCurrentScale)
    }), hammertime.on("panend pancancel pinchend pinchcancel", () => {
        displayImageScale = displayImageCurrentScale, displayImageX = displayImageCurrentX, displayImageY = displayImageCurrentY
    });
    $('body').addClass('showImg');
    $('body').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    noScrollRun();
}

function imgPopClose() {
    noScrollClear();
    $('body').removeClass('showImg');

    $('.popImg img:eq(0)').attr('src', '');
    $('.popImg .btnDownload').attr('href', '');
}