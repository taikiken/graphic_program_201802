'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _ScrollEvents = require('./events/ScrollEvents');

var _ScrollEvents2 = _interopRequireDefault(_ScrollEvents);

var _Freeze = require('../util/Freeze');

var _Freeze2 = _interopRequireDefault(_Freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/07/26 - 21:05
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event


// util


/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
var singletonSymbol = Symbol('Scroll singleton symbol');
/**
 * singleton instance, nullable
 * @type {?Scroll}
 * @private
 */
var instance = null;

/**
 * window scroll event を監視し通知を行います
 * <p>singleton なので new ではなく factory を使用し instance を作成します</p>
 *
 * ```
 * const instance = Scroll.factory();
 * ```
 */

var Scroll = function (_EventDispatcher) {
  _inherits(Scroll, _EventDispatcher);

  _createClass(Scroll, null, [{
    key: 'jump',

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * y 位置に scroll top を即座に移動させます
     * @param {number} [y=0] scroll top 目標値
     * @param {number} [delay=0] time out 遅延 ms
     * @returns {number} time out id
     */
    value: function jump() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return setTimeout(function () {
        window.scrollTo(0, y);
      }, delay);
    }
    /**
     * {@link Freeze}.freeze を実行し scroll 操作を一定期間不能にします
     * @returns {number} time out ID
     */

  }, {
    key: 'freeze',
    value: function freeze() {
      return _Freeze2.default.freeze();
    }
    /**
     * scroll top 位置
     * @returns {number} scroll top 位置を返します
     * @see https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset
     */

  }, {
    key: 'y',
    value: function y() {
      return typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    // ----------------------------------------
    /**
     * Scroll instance を singleton を保証し作成します
     * @returns {Scroll} Scroll instance を返します
     */

  }, {
    key: 'factory',
    value: function factory() {
      if (instance === null) {
        instance = new Scroll(singletonSymbol);
      }
      return instance;
    }
    // ---------------------------------------------------
    //  CONSTRUCTOR
    // ---------------------------------------------------
    /**
    /**
     * singleton です
     * @param {Symbol} checkSymbol singleton を保証するための private instance
     * @returns {Scroll} singleton instance を返します
     */

  }]);

  function Scroll(checkSymbol) {
    var _ret2;

    _classCallCheck(this, Scroll);

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
    // const boundScroll = this.scroll.bind(this);
    /**
     * bound onScroll, window.onscroll event handler
     * @type {function}
     */
    // this.boundScroll = this.scroll.bind(this);
    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this));

    _this.onScroll = _this.onScroll.bind(_this);
    // this.boundScroll = () => boundScroll;
    // @type {Events} - events instance
    // const events = new ScrollEvents(Scroll.SCROLL, this, this);
    /**
     * ScrollEvents instance, 発火時に使用します
     * @type {ScrollEvents}
     */
    _this.events = new _ScrollEvents2.default(Scroll.SCROLL, _this, _this);
    // this.events = () => events;
    /**
     * 前回 scroll top 位置
     * @type {number}
     * @default -1
     */
    _this.previous = -1;
    // /**
    //  * start 済みフラッグ
    //  * @type {boolean}
    //  * @default false
    //  */
    // this.started = false;

    // 設定済み instance を返します
    return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * scroll で発生するイベントを取得します
   * @event SCROLL
   * @returns {string} event, scrollScroll を返します
   * @default scrollScroll
   */


  _createClass(Scroll, [{
    key: 'start',

    // ----------------------------------------
    // METHOD
    // ----------------------------------------
    /**
     * scroll event を監視します
     * @returns {Scroll} method chain 可能なように instance を返します
     */
    value: function start() {
      // if (this.started) {
      //   return this;
      // }
      // this.started = true;
      this.stop();
      window.addEventListener('scroll', this.onScroll, false);
      return this;
    }
    /**
     * scroll event を監視を止めます
     * @returns {Scroll} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      // if (!this.started) {
      //   return this;
      // }
      // this.started = false;
      window.removeEventListener('scroll', this.onScroll);
      return this;
    }
    /**
     * window scroll event handler<br>
     * window scroll event 発生後に scroll top 位置をもたせた Scroll.SCROLL custom event を発火します
     * @param {?Event} event window scroll event, nullable
     * @returns {void}
     */

  }, {
    key: 'onScroll',
    value: function onScroll(event) {
      // @type {number} - scroll top
      var y = Scroll.y();
      // @type {number} - window height
      var height = window.innerHeight;
      // @type {number} - 前回の scroll top
      var previous = this.previous;

      // @type {Events} - events
      var events = this.events;
      // @type {Event} - scroll event
      events.original = event;
      // @type {number} - scroll top
      events.y = y;
      // @type {number} - window height
      events.height = height;
      // @type {number} - window bottom(y + height)
      events.bottom = y + height;
      events.previous = previous;
      // @type {boolean} - 前回の scroll top と比較し移動したかを真偽値で取得します, true: 移動した
      events.changed = previous !== y;
      // @type {number} - 移動量 +（正）: down, -（負）: up
      events.moving = y - previous;
      // event fire
      this.dispatch(events);
      this.previous = y;
    }
  }], [{
    key: 'SCROLL',
    get: function get() {
      return 'scrollScroll';
    }
  }]);

  return Scroll;
}(_EventDispatcher3.default);

exports.default = Scroll;