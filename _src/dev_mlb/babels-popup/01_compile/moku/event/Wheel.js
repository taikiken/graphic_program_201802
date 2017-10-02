'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _WheelEvents = require('./events/WheelEvents');

var _WheelEvents2 = _interopRequireDefault(_WheelEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/07/26 - 19:12
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event


/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
var singletonSymbol = Symbol('Scroll singleton symbol');
/**
 * singleton instance, nullable
 * @type {?Wheel}
 * @private
 */
var instance = null;

/**
 * mousewheel event を監視し通知を行います
 * <p>singleton なので new ではなく factory を使用し instance を作成します</p>
 *
 * ```
 * const instance:Wheel = Wheel.factory();
 * ```
 */

var Wheel = function (_EventDispatcher) {
  _inherits(Wheel, _EventDispatcher);

  _createClass(Wheel, null, [{
    key: 'factory',

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * Wheel instance を singleton を保証し作成します
     * @returns {Wheel} Wheel instance を返します
     */
    value: function factory() {
      if (instance === null) {
        instance = new Wheel(singletonSymbol);
      }
      return instance;
    }
    // ---------------------------------------------------
    //  CONSTRUCTOR
    // ---------------------------------------------------
    /**
     * singleton です
     * @param {Symbol} checkSymbol singleton を保証するための private instance
     * @returns {Wheel} singleton instance を返します
     */

  }]);

  function Wheel(checkSymbol) {
    var _ret2;

    _classCallCheck(this, Wheel);

    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      var _ret;

      return _ret = instance, _possibleConstructorReturn(_this, _ret);
    }

    // onetime setting
    // instance = this;

    // event handler
    // const onMouseWheel = this.onMouseWheel.bind(this);
    /**
     * bound onMouseWheel
     * @type {function}
     */
    var _this = _possibleConstructorReturn(this, (Wheel.__proto__ || Object.getPrototypeOf(Wheel)).call(this));

    _this.onMouseWheel = _this.onMouseWheel.bind(_this);
    // this.onMouseWheel = () => onMouseWheel;
    /**
     * 閾値, wheel 移動量が閾値を超えたときにイベントを発生させます
     * @type {number}
     * @default 200
     */
    _this.threshold = 200;
    /**
     * wheelDelta 移動量が閾値を超えるかをチェックするための積算計算変数
     * @type {number}
     */
    _this.moved = 0;
    // /**
    //  * start flag
    //  * @type {boolean}
    //  */
    // this.started = false;
    // const events = {
    //   up: new WheelEvents(Wheel.UP, this),
    //   down: new WheelEvents(Wheel.DOWN, this),
    // };
    /**
     * UP / DOWN Events instance
     * @returns {{up: WheelEvents, down: WheelEvents}} UP / DOWN Events instance
     */
    _this.events = {
      up: new _WheelEvents2.default(Wheel.UP, _this),
      down: new _WheelEvents2.default(Wheel.DOWN, _this)
    };

    // 設定済み instance を返します
    return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * wheel up で発生するイベントを取得します
   * @event UP
   * @returns {string} event, wheelUp を返します
   * @default wheelUp
   */


  _createClass(Wheel, [{
    key: 'start',

    // ----------------------------------------
    // METHOD
    // ----------------------------------------
    /**
     * mousewheel event を監視します
     * @returns {Wheel} method chain 可能なように instance を返します
     */
    value: function start() {
      // if (this.started) {
      //   return this;
      // }
      // this.started = true;
      // this.unwatch();
      this.stop();
      window.addEventListener('wheel', this.onMouseWheel, false);
      return this;
    }
    /**
     * mousewheel event を監視を止めます
     * @returns {Wheel} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      // if (!this.started) {
      //   return this;
      // }
      // this.started = false;
      window.removeEventListener('wheel', this.onMouseWheel);
      return this;
    }
    /**
     * window mousewheel event handler
     * <p>delta 値を取得し `this.moving` を実行します</p>
     *
     * @listens {WheelEvent} WheelEvent.wheel
     * @param {WheelEvent} event window wheel event
     * @returns {number} 前回移動量に delta 値 を加算した値を返します
     */

  }, {
    key: 'onMouseWheel',
    value: function onMouseWheel(event) {
      var wheelDelta = event.deltaY;
      return this.moving(wheelDelta);
    }
    /**
     * mouse delta から移動量を計算します
     * @param {number} delta mouse delta 値
     * @returns {number} 前回移動量に delta 値 を加算した値を返します
     */

  }, {
    key: 'moving',
    value: function moving(delta) {
      /**
       * 移動量が閾値を超えるかをチェックするための計算変数
       * @type {number}
       */
      this.moved += delta;
      // @type {number}
      var moved = this.moved;

      // 0 check
      if (moved === 0) {
        // 移動量が 0 なので処理をしない
        return moved;
      }

      // 閾値チェック
      if (Math.abs(moved) >= this.threshold) {
        // scroll event を発火します
        if (moved > 0) {
          // scroll up
          this.up(moved);
        } else {
          this.down(moved);
        }

        // initialize moved, 発火後に積算移動変数を初期化します
        this.moved = 0;
        return moved;
      }
      // 閾値を超えていないので処理をしない
      return moved;
    }
    /**
     * scroll up イベントを発火します
     * @param {number} moved 移動量
     * @returns {number} 加算移動量を返します
     */

  }, {
    key: 'up',
    value: function up(moved) {
      // @type {Events}
      var events = this.events.up;
      events.moved = moved;
      this.dispatch(events);

      return moved;
    }
    /**
     * scroll down イベントを発火します
     * @param {number} moved 移動量
     * @returns {number} 加算移動量を返します
     */

  }, {
    key: 'down',
    value: function down(moved) {
      // @type {Events}
      var events = this.events.down;
      events.moved = moved;
      this.dispatch(events);

      return moved;
    }
  }], [{
    key: 'UP',
    get: function get() {
      return 'wheelUp';
    }
    /**
     * wheel  で発生するイベントを取得します
     * @event DOWN
     * @returns {string} event, wheelUp を返します
     * @default wheelUp
     */

  }, {
    key: 'DOWN',
    get: function get() {
      return 'wheelDown';
    }
  }]);

  return Wheel;
}(_EventDispatcher3.default);

exports.default = Wheel;