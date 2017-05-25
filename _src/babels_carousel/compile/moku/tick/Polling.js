'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _EventDispatcher2 = require('../event/EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _Events = require('../event/Events');

var _Events2 = _interopRequireDefault(_Events);

var _Cycle = require('./Cycle');

var _Cycle2 = _interopRequireDefault(_Cycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 一定間隔毎に UPDATE イベントを発生させます
 *
 * @example
 * // 3sec. interval
 * const polling = new Polling(1000 * 3);
 * const update = () => {
 *  // code here, something do
 * };
 * polling.on(Polling.UPDATE, update);
 * polling.start();
 */

var Polling = function (_EventDispatcher) {
  (0, _inherits3.default)(Polling, _EventDispatcher);

  /**
   * 引数の polling に合わせ UPDATE イベントを発生させます
   * @param {number} [interval=1000] イベント発生間隔 milliseconds
   */

  function Polling() {
    var interval = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];
    (0, _classCallCheck3.default)(this, Polling);

    // @type {Cycle} - Cycle instance

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Polling).call(this));

    var cycle = _Cycle2.default.factory();
    var boundUpdate = _this.update.bind(_this);
    var events = new _Events2.default(Polling.UPDATE, _this, _this);
    /**
     * Cycle instance を取得します
     * @ty[e {Cycle}
     */
    _this.cycle = cycle;
    /**
     * 間隔(ms)
     * @type {number}
     */
    _this.interval = interval;
    /**
     * bound update, Cycle.UPDATE event handler
     * @returns {function}
     */
    _this.boundUpdate = boundUpdate;
    /**
     * Events instance - Polling.UPDATE Events object
     * @type {Events}
     */
    _this.events = events;
    /**
     * polling event 発生時間, event を発火すると 0 にリセットされます
     * @type {number}
     */
    _this.begin = 0;
    /**
     * Cycle 監視開始フラッグ
     * @type {boolean}
     */
    _this.started = false;
    return _this;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * 一定間隔(milliseconds)毎に発生するイベント type を取得します
   * @returns {string} event, pollingUpdate を返します
   */


  (0, _createClass3.default)(Polling, [{
    key: 'change',

    // ----------------------------------------
    // METHOD
    // ----------------------------------------
    /**
     * polling 時間を変更します<br>
     * 1. プロパティ polling 変更
     * 1. update 実行
     * @param {number} interval polling 時間
     * @returns {boolean} `update` をコールし Polling.UPDATE event が発生すると true を返します
     */
    value: function change(interval) {
      this.interval = interval;
      return this.update();
    }
    /**
     * started flag を反転させ現在の started flag 状態を取得します
     * @returns {boolean} 現在の started flag 状態を返します
     */

  }, {
    key: 'turnOver',
    value: function turnOver() {
      this.started = !this.started;
      return this.started;
    }
    /**
     * events object を発火前に作成します
     * @param {number} begin 開始時間: 前回の発火時間
     * @param {number} present 現在時間
     * @returns {Events} アップデートした Events を返します
     */

  }, {
    key: 'updateEvents',
    value: function updateEvents(begin, present) {
      this.begin = begin;
      // @type {Events} - start event
      var events = this.events;
      events.begin = begin;
      events.present = present;
      events.interval = this.interval;
      return events;
    }
    /**
     * cycle ループを開始します<br>
     * watch Cycle.UPDATE event
     * @returns {Cycle} cycle ループを開始しインスタンスを返します
     */

  }, {
    key: 'initCycle',
    value: function initCycle() {
      // cycle
      var cycle = this.cycle;
      // bind Cycle.UPDATE
      cycle.on(_Cycle2.default.UPDATE, this.boundUpdate);
      // cycle 開始
      cycle.start();
      return cycle;
    }
    /**
     * polling を開始します
     * @returns {boolean} start に成功すると true を返します
     */

  }, {
    key: 'start',
    value: function start() {
      if (this.started) {
        // already start
        return false;
      }
      // flag -> true
      // this[startSymbol] = true;
      this.turnOver();
      // cycle
      this.initCycle();
      // @type {number} - 開始時間
      var present = Date.now();
      // 強制的に1回目を実行
      this.fire(this.updateEvents(present, present));

      return true;
    }
    /**
     * polling を止めます
     * @returns {boolean} stop に成功すると true を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (!this.started) {
        // not start
        return false;
      }
      this.cycle.off(_Cycle2.default.UPDATE, this.boundUpdate);
      // this[startSymbol] = false;
      this.turnOver();
      return true;
    }
    /**
     * Cycle.UPDATE event handler, polling を計測しイベントを発火するかを判断します
     *
     * @listens {Cycle.UPDATE} Cycle.UPDATE が発生すると実行されます
     * @returns {boolean} Polling.UPDATE event が発生すると true を返します
     */

  }, {
    key: 'update',
    value: function update() {
      // 現在時間
      // @type {number}
      var present = Date.now();
      // @type {number} - interval 間隔
      var interval = this.interval;
      // @type {number} - 開始時間
      var begin = this.begin;
      // 現在時間 が interval より大きくなったか
      if (present - begin >= interval) {
        // event 発火
        this.fire(this.updateEvents(begin, present));
        // 開始時間を update
        this.begin = present;
        // event 発生
        return true;
      }
      return false;
    }
    /**
     * Polling.UPDATE event を発生します
     * @param {Events} events Polling.UPDATE event object
     * @returns {void}
     */

  }, {
    key: 'fire',
    value: function fire(events) {
      this.dispatch(events);
    }
  }], [{
    key: 'UPDATE',
    get: function get() {
      return 'pollingUpdate';
    }
  }]);
  return Polling;
}(_EventDispatcher3.default);

// tick
/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/04 - 16:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event


exports.default = Polling;