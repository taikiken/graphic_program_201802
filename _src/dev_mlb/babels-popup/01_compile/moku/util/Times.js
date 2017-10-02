"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/12/16 - 16:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// --------------------------------
// constant for calculate
/**
 * {@link Times}
 * 計算用定数 - 1 minute
 * ```
 * 1000 * 60
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneMinute = 1000 * 60;
/**
 * {@link Times}
 * 計算用定数 - 1 hour
 * ```
 * 1000 * 60 * 60
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneHour = oneMinute * 60;
/**
 * {@link Times}
 * 計算用定数 - 1 day
 * ```
 * 1000 * 60 * 60 * 24
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneDay = oneHour * 24;
/**
 * {@link Times}
 * 計算用定数 - 1 week
 * ```
 * 1000 * 60 * 60 * 24 * 7
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneWeek = oneDay * 7;
/**
 * {@link Times}
 * 計算用定数 - 1 month
 * ```
 * 1000 * 60 * 60 * 24 * 30
 * ```
 * @type {number}
 * @private
 * @static
 */
var oneMonth = oneDay * 30;

/**
 * 指定時間を計算し Date instance を作成します
 */

var Times = function () {
  function Times() {
    _classCallCheck(this, Times);
  }

  _createClass(Times, null, [{
    key: "present",

    // /**
    //  * 1970-1-1 00:00
    //  * @returns {Date} 1970-1-1 00:00
    //  */
    // static standard() {
    //   return new Date();
    // }
    /**
     * 現在時間 Date instance
     * @returns {Date} 現在時間 Date instance
     */
    value: function present() {
      return new Date();
    }
    /**
     * 指定分後の Date instance
     * @param {number} n 指定分
     * @returns {Date} 指定分後の Date instance
     */

  }, {
    key: "minute",
    value: function minute(n) {
      return new Date(Date.now() + n * oneMinute);
    }
    /**
     * 指定時間後の Date instance
     * @param {number} n 指定時間
     * @returns {Date} 指定時間後の Date instance
     */

  }, {
    key: "hour",
    value: function hour(n) {
      return new Date(Date.now() + n * oneHour);
    }
    /**
     * 指定日後の Date instance
     * @param {number} n 指定日
     * @returns {Date} 指定日後の Date instance
     */

  }, {
    key: "day",
    value: function day(n) {
      return new Date(Date.now() + n * oneDay);
    }
    /**
     * 指定週後の Date instance
     * @param {number} n 指定週
     * @returns {Date} 指定週後の Date instance
     */

  }, {
    key: "week",
    value: function week(n) {
      return new Date(Date.now() + n * oneWeek);
    }
    /**
     * 指定月後の Date instance
     * @param {number} n 指定月
     * @returns {Date} 指定月後の Date instance
     */

  }, {
    key: "month",
    value: function month(n) {
      return new Date(Date.now() + n * oneMonth);
    }
  }]);

  return Times;
}();

exports.default = Times;