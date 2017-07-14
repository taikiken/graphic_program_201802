'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Polling2 = require('./Polling');

var _Polling3 = _interopRequireDefault(_Polling2);

var _FpsEvents = require('./events/FpsEvents');

var _FpsEvents2 = _interopRequireDefault(_FpsEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/07/04 - 14:19
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event
// import Events from '../event/Events';

// tick


// tick/events


// /**
//  * private property key, fps を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const fpsSymbol = Symbol('Singleton Fps Symbol');

/**
 * フレームレート毎に `UPDATE` イベントを発生させます
 *
 * @example
 * // 2sec. interval
 * const fps = new Fps(0.5);
 * const update = () => {
 *  // code here, something do
 * };
 * fps.on(Fps.UPDATE, update);
 * fps.start();
 * */
var Fps = function (_Polling) {
  _inherits(Fps, _Polling);

  // /**
  //  * フレームレート毎に発生するイベントを取得します
  //  * @event UPDATE
  //  * @returns {string} event, fpsUpdate を返します
  //  * @default fpsUpdate
  //  */
  // static get UPDATE() {
  //   return 'fpsUpdate';
  // }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 引数の frame rate に合わせ UPDATE イベントを発生させます
   * @param {number} [fps=30] frame rate, default: 30
   */
  function Fps() {
    var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

    _classCallCheck(this, Fps);

    // @type {Events} - Events
    var _this = _possibleConstructorReturn(this, (Fps.__proto__ || Object.getPrototypeOf(Fps)).call(this, 1000 / fps));

    var events = new _FpsEvents2.default(Fps.UPDATE, _this, _this);
    events.fps = fps;
    /**
     * Fps.UPDATE Events instance
     * @type {Events}
     */
    _this.events = events;
    /**
     * frame rate
     * @type {number}
     */
    _this.fps = fps;
    return _this;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * fps を変更します
   * 1. プロパティ polling 変更
   * 1. 継承 method update 実行
   * @param {number} interval fps
   * @returns {boolean} 継承 method `update` をコールし UPDATE event が発生すると true を返します
   */

  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * フレームレート毎に発生するイベント - fpsUpdate
   * @event UPDATE
   * @type {string}
   */


  _createClass(Fps, [{
    key: 'change',
    value: function change(interval) {
      /**
       * polling 間隔
       * @type {number}
       */
      this.interval = 1000 / interval;
      this.fps = interval;
      this.events.fps = interval;
      // return this.update();
      return this.start();
    }
  }]);

  return Fps;
}(_Polling3.default);

Fps.UPDATE = 'fpsUpdate';
exports.default = Fps;