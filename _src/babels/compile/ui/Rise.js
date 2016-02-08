/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
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
exports.Rise = undefined;

var _EventDispatcher2 = require('../event/EventDispatcher');

var _Dom = require('../util/Dom');

var _Scroll = require('../util/Scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 対象 element bottom が window.bottom を超えたら Event を発生させます
 */

var Rise = exports.Rise = function (_EventDispatcher) {
  (0, _inherits3.default)(Rise, _EventDispatcher);

  /**
   * 対象 element bottom が window.bottom を超えることを監視します
   * @param {Element} element 対象 element
   * @param {Number} [offset=0] 減産数値
   */

  function Rise(element) {
    var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    (0, _classCallCheck3.default)(this, Rise);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Rise).call(this));

    _this._element = element;
    _this._offset = offset;
    _this._dom = new _Dom.Dom(element);
    _this._boundScroll = _this.onScroll.bind(_this);
    _this._scroll = _Scroll.Scroll.factory();
    return _this;
  }

  /**
   * RISE event type
   * @returns {string} RISE event type を返します
   */

  (0, _createClass3.default)(Rise, [{
    key: 'start',

    /**
     * 監視を始めます
     */
    value: function start() {
      console.log('************************ Rise.start');

      this._scroll.on(_Scroll.Scroll.SCROLL, this._boundScroll);
      this._scroll.start();
    }
    /**
     * 監視を止めます
     */

  }, {
    key: 'stop',
    value: function stop() {
      console.log('------------------------ Rise.stop');

      this._scroll.off(_Scroll.Scroll.SCROLL, this._boundScroll);
      this._scroll.stop();
    }
    /**
     * Scroll.SCROLL event handler
     * @param {Object} event Scroll.SCROLL event object
     */

  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      // window property
      var y = event.y;
      var windowHeight = window.innerHeight;
      var windowBottom = y + windowHeight + this._offset;
      // element property
      var offsetRect = this._dom.offset();
      var elementBottom = y + offsetRect.top + offsetRect.height;

      // console.log( 'onScroll', windowBottom, elementBottom  );

      // element.bottom が insect しているかを調べます
      if (windowBottom > elementBottom) {
        this.dispatch({ type: Rise.RISE, window: windowBottom, element: elementBottom });
      }
    }
  }], [{
    key: 'RISE',
    get: function get() {
      return 'rise';
    }
  }]);
  return Rise;
}(_EventDispatcher2.EventDispatcher);