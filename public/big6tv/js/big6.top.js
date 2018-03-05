'use strict';

var initLoad = false;
var getJson = function getJson() {
    var insertElement = document.querySelector('.sponsor-wrap');
    var windowWidth = window.outerWidth;
    var pageUrl = location.href;
    var imageTag = void 0;
    var list = void 0;
    var api = void 0;
    if (pageUrl.match(/sportsbull.s3/) || pageUrl.match(/localhost/)) {
        api = 'https://dev.sportsbull.jp/api/big6tv/live/2018s';
    } else if (pageUrl.match(/dev.sportsbull.jp/)) {
        api = '//dev.sportsbull.jp/api/big6tv/live/2018s';
    } else if (pageUrl.match(/stg.sportsbull.jp/)) {
        api = '//stg.sportsbull.jp/api/big6tv/live/2018s';
    } else {
        api = '//sportsbull.jp/api/big6tv/live/2018s';
    }
    $.ajax({
        type: "GET",
        url: 'https://dev.sportsbull.jp/api/big6tv/live/2018s',
        cache: false,
        timeout: 10000
    }).then(function (json) {
        list = json.response;
        if (!initLoad) {
            initLoad = true;
            setInterval(getJson, list.live.interval * 1000);
        }
        if (list.live.isPlaying) {
            if (windowWidth > 768) {
                imageTag = '<a href="/big6tv/live/2018s/"><img src="/img/bnr_onair.png"></a>';
            } else {
                imageTag = '<a href="/big6tv/live/2018s/"><img src="/img/bnr_onair_sp.png"></a>';
            }
            insertElement.innerHTML = imageTag;
        } else {
            if (windowWidth > 768) {
                imageTag = '<a href="//big6tv/2018s/"><img src="/img/bnr_offair.png"></a>';
            } else {
                imageTag = '<a href="/big6tv/2018s/"><img src="/img/bnr_offair_sp.png"></a>';
            }
            insertElement.innerHTML = imageTag;
        }
    });
};
getJson();
//# sourceMappingURL=big6.top.js.map
