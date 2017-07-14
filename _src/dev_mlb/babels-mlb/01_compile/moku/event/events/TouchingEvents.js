'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Events2 = require('../Events');

var _Events3 = _interopRequireDefault(_Events2);

var _Vectors = require('../../util/Vectors');

var _Vectors2 = _interopRequireDefault(_Vectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/10/08
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2015 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TouchingEvents
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// events


// util


/**
 * {@link Touching} Events
 */
var TouchingEvents = function (_Events) {
  _inherits(TouchingEvents, _Events);

  /**
   * Touching events object 各プロパティを設定します
   * @param {string} type event type
   * @param {*} target イベント発生インスタンス
   * @param {Event} origin 発生時のオリジナルイベント
   * @param {Vectors} current 現在の位置
   * @param {Vectors} between 前回位置との差
   * @param {boolean} scrolling scroll したかの真偽値, true: scroll している
   */
  function TouchingEvents(type, target, origin) {
    var current = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _Vectors2.default();
    var between = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new _Vectors2.default();
    var scrolling = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, TouchingEvents);

    /**
     * 発生時のオリジナルイベント
     * @type {Event}
     */
    var _this = _possibleConstructorReturn(this, (TouchingEvents.__proto__ || Object.getPrototypeOf(TouchingEvents)).call(this, type, target));
    // super


    _this.origin = origin;
    /**
     * 現在の位置
     * @type {Vectors}
     */
    _this.current = current;
    /**
     * 前回位置との差
     * @type {Vectors}
     */
    _this.between = between;
    /**
     * scroll したかの真偽値
     * @type {boolean}
     */
    _this.scrolling = scrolling;
    return _this;
  }

  return TouchingEvents;
}(_Events3.default);

exports.default = TouchingEvents;