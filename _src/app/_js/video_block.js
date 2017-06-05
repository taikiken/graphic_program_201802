/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/05 - 17:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// original
(function () {

  var target1, target2;

  if (
    !location.href.match(/\\?debug/) &&
    !navigator.userAgent.match(/undotsushin-(android|ios)/)
  ) {
    target1 = document.getElementById("web-article");
    target2 = document.getElementById("app-article");
  }
  else {
    target1 = document.getElementById("app-article");
    target2 = document.getElementById("web-article");
  }

  target1.style.display = "block";
  target2.innerHTML = "";

})();

// シングル二つはポスグレのエスケープで使用していて、表示の際に戻す際にシングルひとつに戻ってしまいます。
// シングルクォート二つ連続で使用するときだけ、ダブルクォートで代用
// @see https://github.com/undotsushin/undotsushin/issues/2004
// @see https://github.com/undotsushin/undotsushin/pull/2009

(function(window) {
  'use strict';
  var document = window.document;
  var videojs = window.videojs;
  var web = document.getElementById('web-article');
  var app = document.getElementById('app-article');
  var videos, video;

  function dispose() {
    if (!videojs) {
      setTimeout(dispose, 25);
      return;
    }
    videojs(video).dispose();
  }
  function onLoad() {
    if (video) {
      dispose();
    }
    app.innerHTML = "";
    web.style.display = 'block';
  }
  if (web && app) {
    if (
      !location.href.match(/\\?debug/) &&
      !navigator.userAgent.match(/undotsushin-(android|ios)/)
    ) {
      videos = app.getElementsByTagName('video');
      if (videos && videos.length > 0) {
        video = videos[0];
      }
      setTimeout(onLoad, 500);
    } else {
      web.innerHTML = "";
      app.style.display = 'block';
    }
  }
}(window));

