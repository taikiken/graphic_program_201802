'use strict';

(function () {
    'use strict';

    var insertElement = document.querySelector('.sponsor-wrap');
    var windowWidth = window.outerWidth;
    var pageUrl = location.href;
    var ua = window.navigator.userAgent;
    var initLoadImg = false;
    var imgLoaded = false;
    var isPlaying = false;
    var imageTag = void 0;
    var list = void 0;
    var apiImg = void 0;

    if (pageUrl.match(/sportsbull.s3/) || pageUrl.match(/localhost/)) {
        apiImg = 'https://dev.sportsbull.jp/api/big6tv/live/2018s';
    } else if (pageUrl.match(/dev.sportsbull.jp/)) {
        apiImg = '//dev.sportsbull.jp/api/big6tv/live/2018s';
    } else if (pageUrl.match(/stg.sportsbull.jp/)) {
        apiImg = '//stg.sportsbull.jp/api/big6tv/live/2018s';
    } else {
        apiImg = '//sportsbull.jp/api/big6tv/live/2018s';
    }

    var getJson = function getJson() {
        $.ajax({
            type: "GET",
            url: apiImg,
            cache: false,
            timeout: 10000
        }).then(function (json) {
            list = json.response;
            if (!initLoadImg) {
                initLoadImg = true;
                setInterval(getJson, json.response.live.interval * 1000);
            }
            if (isPlaying !== list.live.isPlaying) {
                imgLoaded = false;
                isPlaying = list.live.isPlaying;
            }
            if (list.live.isPlaying) {
                // console.log('中継中', imgLoaded)
                if (!imgLoaded) {
                    if (windowWidth > 768) {
                        imageTag = '<a href="/sportsbull.jp/big6tv/live/2018s/"><img src="/img/bnr_onair.png"></a>';
                    } else {
                        imageTag = '<a href="/sportsbull.jp/big6tv/live/2018s/"><img src="/img/bnr_onair_sp.png"></a>';
                    }
                    insertElement.innerHTML = imageTag;
                    imgLoaded = true;
                    // console.log('中継中　画像埋め込み後', imgLoaded)
                    if (ua === 'undotsushin-ios' || ua === 'undotsushin-android') {
                        // console.log('appだよ')
                        window.webkit.messageHandlers.onLoadComplete.postMessage("");
                    }
                }
            } else {
                // console.log('中継中じゃない',imgLoaded)
                if (!imgLoaded) {
                    if (windowWidth > 768) {
                        imageTag = '<a href="/sportsbull.jp/big6tv/2018s/"><img src="/img/bnr_offair.png"></a>';
                    } else {
                        imageTag = '<a href="/sportsbull.jp/big6tv/2018s/"><img src="/img/bnr_offair_sp.png"></a>';
                    }
                    insertElement.innerHTML = imageTag;
                    imgLoaded = true;
                    // console.log('中継中じゃない 画像埋め込み後', imgLoaded)
                    if (ua === 'undotsushin-ios' || ua === 'undotsushin-android') {
                        // console.log('appだよ')
                        window.webkit.messageHandlers.onLoadComplete.postMessage("");
                    }
                }
            }
        });
    };
    getJson();
})();
//# sourceMappingURL=big6.top.js.map
