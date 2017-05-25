'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Events = require('../event/Events');

var _Events2 = _interopRequireDefault(_Events);

var _Polling2 = require('./Polling');

var _Polling3 = _interopRequireDefault(_Polling2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// /**
//  * private property key, fps を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const fpsSymbol = Symbol('Singleton Fps Symbol');

/**
 * フレームレート毎に UPDATE イベントを発生させます
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
/**
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

var Fps = function (_Polling) {
  (0, _inherits3.default)(Fps, _Polling);
  (0, _createClass3.default)(Fps, null, [{
    key: 'UPDATE',

    // ----------------------------------------
    // EVENT
    // ----------------------------------------
    /**
     * フレームレート毎に発生するイベントを取得します
     * @event UPDATE
     * @returns {string} event, fpsUpdate を返します
     * @default fpsUpdate
     */
    get: function get() {
      return 'fpsUpdate';
    }
    // ----------------------------------------
    // CONSTRUCTOR
    // ----------------------------------------
    /**
     * 引数の frame rate に合わせ UPDATE イベントを発生させます
     * @param {number} [fps=30] frame rate, default: 30
     */

  }]);

  function Fps() {
    var fps = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];
    (0, _classCallCheck3.default)(this, Fps);

    // @type {Events} - Events

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Fps).call(this, 1000 / fps));

    var events = new _Events2.default(Fps.UPDATE, _this, _this);
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
   * polling 時間を変更します<br>
   * 1. プロパティ polling 変更
   * 1. update 実行
   * @param {number} interval fps
   * @returns {boolean} `update` をコールし Polling.UPDATE event が発生すると true を返します
   */


  (0, _createClass3.default)(Fps, [{
    key: 'change',
    value: function change(interval) {
      /**
       * polling 間隔
       * @type {number}
       */
      this.interval = 1000 / interval;
      this.fps = interval;
      return this.update();
    }
  }]);
  return Fps;
}(_Polling3.default);

// tick


exports.default = Fps;