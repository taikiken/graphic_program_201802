'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = require('../event/EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _CycleEvents = require('./events/CycleEvents');

var _CycleEvents2 = _interopRequireDefault(_CycleEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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

// import Events from '../event/Events';

// tick/events


/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
var singletonSymbol = Symbol('singleton instance');
/**
 * singleton instance, nullable
 * @type {?Cycle}
 * @private
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
  _inherits(Cycle, _EventDispatcher);

  _createClass(Cycle, null, [{
    key: 'factory',

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * Cycle instance を singleton を保証し作成します
     * @returns {Cycle} Cycle instance を返します
     */
    value: function factory() {
      if (instance === null) {
        instance = new Cycle(singletonSymbol);
      }
      return instance;
    }
    // ---------------------------------------------------
    //  CONSTRUCTOR
    // ---------------------------------------------------
    /**
     * singleton です
     * @param {Symbol} checkSymbol singleton を保証するための private instance
     * @returns {Cycle} singleton instance を返します
     */

    // ---------------------------------------------------
    //  CONSTANT / EVENT
    // ---------------------------------------------------
    /**
     * requestAnimationFrame 毎に発生するイベント - cycleUpdate
     * @event UPDATE
     * @type {string}
     */

  }]);

  function Cycle(checkSymbol) {
    var _ret2;

    _classCallCheck(this, Cycle);

    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      var _ret;

      return _ret = instance, _possibleConstructorReturn(_this, _ret);
    }

    // -------------------------------
    // onetime setting
    // instance = this;
    // const events = new Events(Cycle.UPDATE, this, this);
    // const update = this.update.bind(this);
    /**
     * Cycle.UPDATE Events instance
     * @type {Events}
     */
    var _this = _possibleConstructorReturn(this, (Cycle.__proto__ || Object.getPrototypeOf(Cycle)).call(this));

    _this.events = new _CycleEvents2.default(Cycle.UPDATE, _this, _this);
    /**
     * bound update requestAnimationFrame callback
     * @type {function}
     */
    _this.onUpdate = _this.onUpdate.bind(_this);
    /**
     * requestAnimationFrame ID
     * @type {number}
     */
    _this.id = 0;
    // /**
    //  * start 済みフラッグ
    //  * @type {boolean}
    //  */
    // this.started = false;
    _this.start(checkSymbol);
    // 設定済み instance を返します
    return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
  }
  // // ----------------------------------------
  // // EVENT
  // // ----------------------------------------
  // /**
  //  * requestAnimationFrame 毎に発生するイベントを取得します
  //  * @event UPDATE
  //  * @returns {string} event, cycleUpdate を返します
  //  * @default cycleUpdate
  //  */
  // static get UPDATE() {
  //   return 'cycleUpdate';
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * loop(requestAnimationFrame) を開始します
   * @param {Symbol} checkSymbol inner method 保証する inner Symbol
   */


  _createClass(Cycle, [{
    key: 'start',
    value: function start(checkSymbol) {
      // checkSymbol と singleton が等価かをチェックします
      if (checkSymbol !== singletonSymbol) {
        throw new Error('start is private method, dont call this.');
      }
      // if (this.started) {
      //   // already start
      //   return false;
      // }
      // this.started = true;
      this.update();
      //
      // // @return
      // return true;
    }
    /**
     * loop(cancelAnimationFrame) を止めます
     * @param {number} [id] requestAnimationFrame id を使い cancelAnimationFrame をします
     */

  }, {
    key: 'stop',
    value: function stop() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.id;

      // if (!this.started) {
      //   // not start
      //   return false;
      // }
      //
      // cancelAnimationFrame(id);
      // this.started = false;
      //
      // // @return
      // return true;
      cancelAnimationFrame(id);
    }
    // ----------------------------------------
    // PRIVATE METHOD
    // ----------------------------------------
    /**
     * loop(requestAnimationFrame)コールバック関数<br>Cycle.UPDATE event を発火します
     * @returns {number} requestAnimationFrame ID
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      // @type {number} - requestAnimationFrame id
      var id = requestAnimationFrame(this.onUpdate);
      this.id = id;

      // @type {Events} - events
      var events = this.events;
      events.id = id;
      // event fire
      this.dispatch(events);
      return id;
    }
  }]);

  return Cycle;
}(_EventDispatcher3.default);

Cycle.UPDATE = 'cycleUpdate';
exports.default = Cycle;