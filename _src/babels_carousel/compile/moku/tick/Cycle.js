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

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _EventDispatcher2 = require('../event/EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _Events = require('../event/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/03
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

// event
var singletonSymbol = (0, _symbol2.default)('singleton instance');
/**
 * singleton instance, nullable
 * @type {?Cycle}
 * @private
 * @static
 */
var instance = null;

/**
 * <p>requestAnimationFrame を使用しループイベントを発生させます</p>
 * <p>singleton なので new ではなく factory を使用し instance を作成します</p>
 *
 * ```
 * const loop = Cycle.factory();
 * const update = () => {
 *  // code here, something do
 * };
 * loop.on(Cycle.UPDATE, update);
 * loop.start();
 * ```
 *
 * <p>requestAnimationFrame は tab が active(focus) な時のみ発生します</p>
 */

var Cycle = function (_EventDispatcher) {
  (0, _inherits3.default)(Cycle, _EventDispatcher);

  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @returns {Cycle} singleton instance を返します
   */

  function Cycle(checkSymbol) {
    var _ret2;

    (0, _classCallCheck3.default)(this, Cycle);

    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      var _ret;

      return _ret = instance, (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    // -------------------------------
    // onetime setting

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Cycle).call(this));

    instance = _this;
    var events = new _Events2.default(Cycle.UPDATE, _this, _this);
    var boundUpdate = _this.update.bind(_this);
    /**
     * Cycle.UPDATE Events instance
     * @type {Events}
     */
    _this.events = events;
    /**
     * bound update requestAnimationFrame callback
     * @type {function}
     */
    _this.boundUpdate = boundUpdate;
    /**
     * requestAnimationFrame ID
     * @type {number}
     */
    _this.id = 0;
    /**
     * start 済みフラッグ
     * @type {boolean}
     */
    _this.started = false;
    // 設定済み instance を返します
    return _ret2 = instance, (0, _possibleConstructorReturn3.default)(_this, _ret2);
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * requestAnimationFrame 毎に発生するイベントを取得します
   * @event UPDATE
   * @returns {string} event, cycleUpdate を返します
   * @default cycleUpdate
   */


  (0, _createClass3.default)(Cycle, [{
    key: 'start',

    // ----------------------------------------
    // METHOD
    // ----------------------------------------
    /**
     * loop(requestAnimationFrame) を開始します
     * @returns {boolean} start に成功すると true を返します
     */
    value: function start() {
      if (this.started) {
        // already start
        return false;
      }
      this.started = true;
      this.update();

      // @return
      return true;
    }
    /**
     * loop(cancelAnimationFrame) を止めます
     * @param {number} [id] requestAnimationFrame id を使い cancelAnimationFrame をします
     * @returns {boolean} stop に成功すると true を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      var id = arguments.length <= 0 || arguments[0] === undefined ? this.id : arguments[0];

      if (!this.started) {
        // not start
        return false;
      }

      cancelAnimationFrame(id);
      this.started = false;

      // @return
      return true;
    }
    // ----------------------------------------
    // PRIVATE METHOD
    // ----------------------------------------
    /**
     * loop(requestAnimationFrame)コールバック関数<br>Cycle.UPDATE event を発火します
     * @returns {number} requestAnimationFrame ID
     */

  }, {
    key: 'update',
    value: function update() {
      // @type {number} - requestAnimationFrame id
      var id = requestAnimationFrame(this.boundUpdate);
      this.id = id;

      // @type {Events} - events
      var events = this.events;
      events.id = id;
      // event fire
      this.dispatch(events);
      return id;
    }
    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * Cycle instance を singleton を保証し作成します
     * @returns {Cycle} Cycle instance を返します
     */

  }], [{
    key: 'factory',
    value: function factory() {
      if (instance === null) {
        return new Cycle(singletonSymbol);
      }
      return instance;
    }
  }, {
    key: 'UPDATE',
    get: function get() {
      return 'cycleUpdate';
    }
  }]);
  return Cycle;
}(_EventDispatcher3.default);

exports.default = Cycle;