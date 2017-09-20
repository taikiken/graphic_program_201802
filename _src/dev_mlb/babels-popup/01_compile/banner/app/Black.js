'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * app banner popup 動作条件を管理します
 */
var Black = function () {
  function Black() {
    _classCallCheck(this, Black);
  }

  _createClass(Black, null, [{
    key: 'app',

    /**
     * `userAgent` をチェックします
     * - gunosy
     * - newspass
     * - undotsushin-ios
     * - undotsushin-android
     * @returns {boolean} true: 該当する
     */
    value: function app() {
      return !!navigator.userAgent.match(/gunosy|newspass|undotsushin-ios|undotsushin-android/i);
    }
    /**
     * popup 対象かを `pathname`, `userAgent` でチェックします
     * @returns {boolean} true: 対象外
     */

    /**
     * URL black list
     * @type {[string,string]}
     */

  }, {
    key: 'detect',
    value: function detect() {
      if (Black.app()) {
        return true;
      }
      // check pathname with list
      var pathname = location.pathname;
      return Black.list.some(function (url) {
        return pathname.indexOf(url) === 0;
      });
    }
  }]);

  return Black;
}();

Black.list = ['/about', '/big6tv/live/2017a'];
exports.default = Black;