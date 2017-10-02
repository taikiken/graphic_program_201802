! function(e) {
    function a(i) {
        if (r[i]) return r[i].exports;
        var n = r[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(n.exports, n, n.exports, a), n.loaded = !0, n.exports
    }
    var r = {};
    return a.m = e, a.c = r, a.p = "js", a(0)
}([function(e, a) {
    /*!
     * Copyright (c) 2011-2017 inazumatv.com, inc.
     * @author (at)taikiken / http://inazumatv.com
     * @date 2017/02/09 - 19:05
     *
     * Distributed under the terms of the MIT license.
     * http://www.opensource.org/licenses/mit-license.html
     *
     * This notice shall be included in all copies or substantial portions of the Software.
     *
     * @build 2017-05-08 17:11:32
     */
    "use strict";
    var r = self.UT,
        i = r.app.Dom,
        n = r.ui.PageTop,
        t = r.view.sidebar.ViewRanking,
        s = r.view.sidebar.ViewVideos,
        o = r.view.sidebar.ViewRecommend,
        v = r.view.View;
    n.start();
    var c = function() {
            var e = i.adRanking();
            e && (e.style.cssText = "display: block;")
        },
        d = function() {
            var e = i.adVideo();
            e && (e.style.cssText = "display: block;")
        },
        l = function() {
            var e = i.ranking();
            if (e) {
                var a = {};
                a[v.DID_MOUNT] = c;
                var r = new t(e, a, "americanfootball");
                r.start()
            }
        },
        f = function() {
            var e = i.video();
            if (e) {
                var a = {};
                a[v.DID_MOUNT] = d;
                var r = new s(e, a, "americanfootball");
                r.start()
            }
        },
        u = function() {
            var e = i.recommend();
            if (e) {
                var a = new o(e, {}, "americanfootball");
                a.start()
            }
        };
    l(), f(), u()
}]);