/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 14:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scroll = undefined;

var _EventDispatcher2 = require('../event/EventDispatcher');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scroll = exports.Scroll = function (_EventDispatcher) {
  (0, _inherits3.default)(Scroll, _EventDispatcher);

  function Scroll() {
    (0, _classCallCheck3.default)(this, Scroll);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scroll).call(this));
  }
  /**
   * scroll top 位置
   * @return {Number} scroll top 位置を返します
   */

  (0, _createClass3.default)(Scroll, null, [{
    key: 'y',
    get: function get() {
      // https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
      return typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    /**
     * scroll top 位置 を設定します
     * @param {Number} top
     */
    ,
    set: function set(top) {
      window.scrollTo(0, top);
    }
    /*
      motion( top:Number, duration:Number = 0.5, easing:Function = null ):void {
    
      }
      */

  }]);
  return Scroll;
}(_EventDispatcher2.EventDispatcher);