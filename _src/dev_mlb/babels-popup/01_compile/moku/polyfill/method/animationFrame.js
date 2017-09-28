'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/28 - 18:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Android 4.3 以下
 * requestAnimationFrame 未実装なので polyfill する
 * babel-preset-env 補完しない？
 */
var animationFrame = function animationFrame() {
  // native code check
  if (self.requestAnimationFrame && self.cancelAnimationFrame) {
    return;
  }
  // vendor prefix
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  // add vendor prefix
  vendors.some(function (prefix) {
    self.requestAnimationFrame = self[prefix + 'RequestAnimationFrame'];
    self.cancelAnimationFrame = self[prefix + 'CancelAnimationFrame'] || self[prefix + 'CancelRequestAnimationFrame'];
    // return false;
    return !!self.requestAnimationFrame;
  });
  // ------------------------------------------------
  // still check
  if (!self.requestAnimationFrame) {
    var lastTime = 0;
    self.requestAnimationFrame = function (callback) {
      var currentTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
      var id = setTimeout(function () {
        callback(currentTime + timeToCall);
      }, timeToCall);
      lastTime = currentTime + timeToCall;
      return id;
    };
  }
  if (!self.cancelAnimationFrame) {
    self.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
};

exports.default = animationFrame;