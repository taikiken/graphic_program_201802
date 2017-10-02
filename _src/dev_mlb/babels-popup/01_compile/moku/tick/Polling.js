'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = require('../event/EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _Cycle = require('./Cycle');

var _Cycle2 = _interopRequireDefault(_Cycle);

var _PollingEvents = require('./events/PollingEvents');

var _PollingEvents2 = _interopRequireDefault(_PollingEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

// import Events from '../event/Events';

// tick


// tick/events


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
  _inherits(Polling, _EventDispatcher);

  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 引数の polling に合わせ UPDATE イベントを発生させます
   * @param {number} [interval=1000] イベント発生間隔 milliseconds
   */
  function Polling() {
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

    _classCallCheck(this, Polling);

    /**
     * Cycle instance を取得します
     * @ty[e {Cycle}
     */
    var _this = _possibleConstructorReturn(this, (Polling.__proto__ || Object.getPrototypeOf(Polling)).call(this));

    _this.cycle = _Cycle2.default.factory();
    /**
     * 間隔(ms)
     * @type {number}
     */
    _this.interval = interval;
    /**
     * bound onUpdate, Cycle.UPDATE event handler
     * @returns {function}
     */
    _this.onUpdate = _this.onUpdate.bind(_this);
    /**
     * Events instance - Polling.UPDATE Events object
     * @type {Events}
     */
    _this.events = new _PollingEvents2.default(Polling.UPDATE, _this, _this);
    /**
     * polling event 発生時間, event を発火すると 0 にリセットされます
     * @type {number}
     */
    _this.begin = 0;
    return _this;
  }
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

  // ----------------------------------------
  // STATIC EVENT
  // ----------------------------------------
  /**
   * 一定間隔(milliseconds)毎に発生するイベント - pollingUpdate
   * @event UPDATE
   * @type {string}
   */


  _createClass(Polling, [{
    key: 'change',
    value: function change(interval) {
      this.interval = interval;
      return this.start();
    }
    /**
     * polling を開始します
     * @returns {boolean} start に成功すると true を返します
     */

  }, {
    key: 'start',
    value: function start() {
      // event unbind
      this.stop();
      // @type {number} - 開始時間
      this.begin = Date.now();
      this.cycle.on(_Cycle2.default.UPDATE, this.onUpdate);
      return true;
    }
    /**
     * polling を止めます
     * @returns {boolean} stop に成功すると true を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.cycle.off(_Cycle2.default.UPDATE, this.onUpdate);
      return true;
    }
    /**
     * Cycle.UPDATE event handler, polling を計測しイベントを発火するかを判断します
     *
     * @listens {Cycle.UPDATE} Cycle.UPDATE が発生すると実行されます
     * @returns {boolean} Polling.UPDATE event が発生すると true を返します
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate() {
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
    // -----
    // event create & fire
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
     * Polling.UPDATE event を発生します
     * @param {Events} events Polling.UPDATE event object
     * @returns {void}
     */

  }, {
    key: 'fire',
    value: function fire(events) {
      this.dispatch(events);
    }
  }]);

  return Polling;
}(_EventDispatcher3.default);

Polling.UPDATE = 'pollingUpdate';
exports.default = Polling;