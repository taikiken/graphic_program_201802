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

var _symbol = null;
var _instance = null;

/**
 * scroll に関する処理
 */

var Scroll = exports.Scroll = function (_EventDispatcher) {
  (0, _inherits3.default)(Scroll, _EventDispatcher);

  /**
   * scroll に関する singleton class
   * @param {Symbol} target Singleton を実現するための private symbol
   * @returns {Scroll}
   */

  function Scroll(target) {
    var _ret;

    (0, _classCallCheck3.default)(this, Scroll);

    if (_symbol !== target) {

      throw new Error('Scroll is singleton Class. not use new Scroll(). instead Scroll.factory()');
    }

    if (_instance === null) {
      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Scroll).call(this));

      _instance = _this;
      _this.boundScroll = _this.onScroll.bind(_this);
    }

    return _ret = _instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // ---------------------------------------------------
  //  method
  // ---------------------------------------------------

  (0, _createClass3.default)(Scroll, [{
    key: 'start',
    value: function start() {
      window.addEventListener('scroll', this.boundScroll, false);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('scroll', this.boundScroll);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      this.dispatch({ type: Scroll.SCROLL, originalEvent: event, y: Scroll.y });
    }
    // ---------------------------------------------------
    //  static GETTER / SETTER
    // ---------------------------------------------------

  }], [{
    key: 'factory',

    /*
      motion( top:Number, duration:Number = 0.5, easing:Function = null ):void {
    
      }
      */
    // ---------------------------------------------------
    //  static method
    // ---------------------------------------------------
    /**
     * singleton instance を生成します
     * @return {Scroll} Scroll instance を返します
     */
    value: function factory() {

      if (_instance === null) {

        _instance = new Scroll(_symbol);
      }

      return _instance;
    }
  }, {
    key: 'SCROLL',
    get: function get() {
      return 'scrollScroll';
    }
    /**
     * scroll top 位置
     * @return {Number} scroll top 位置を返します
     */

  }, {
    key: 'y',
    get: function get() {
      // https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
      return typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    /**
     * scroll top 位置 を設定します
     * @param {Number} top スクロール位置(px)
     */
    ,
    set: function set(top) {
      window.scrollTo(0, top);
    }
  }]);
  return Scroll;
}(_EventDispatcher2.EventDispatcher);