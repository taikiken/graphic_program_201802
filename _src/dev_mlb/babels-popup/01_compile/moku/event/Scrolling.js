'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scroll = require('./Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _ScrollEvents = require('./events/ScrollEvents');

var _ScrollEvents2 = _interopRequireDefault(_ScrollEvents);

var _Rate = require('../tick/Rate');

var _Rate2 = _interopRequireDefault(_Rate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/11/04
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2015 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event


// tick


/**
 * fps: {@link Rate} new Rate(Rate.RATE_5)` で Scroll 位置を計算します
 *
 * @example
 * // 途中で rate を変更する
 * const scrolling = new Scrolling();
 * scrolling
 *    .start()
 *    .rate.setRate(Rate.RATE_12);
 * */
var Scrolling = function (_EventDispatcher) {
  _inherits(Scrolling, _EventDispatcher);

  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * @param {Rate} [rate=new Rate(Rate.Rate_5)] Rate instance, scroll 監視 fps を設定します
   */
  function Scrolling() {
    var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Rate2.default(_Rate2.default.RATE_5);

    _classCallCheck(this, Scrolling);

    // @type {function}
    // const onUpdate = this.scroll.bind(this);
    /**
     * bound onUpdate, Rate.UPDATE event handler
     * @type {function}
     */
    var _this = _possibleConstructorReturn(this, (Scrolling.__proto__ || Object.getPrototypeOf(Scrolling)).call(this));

    _this.onUpdate = _this.onUpdate.bind(_this);
    // this.onUpdate = onUpdate;
    // @type {ScrollEvents}
    // const events = new ScrollEvents(Scrolling.UPDATE, this, this);
    /**
     * ScrollEvents instance, 発火時に使用します
     * @type {ScrollEvents}
     */
    _this.events = new _ScrollEvents2.default(Scrolling.UPDATE, _this, _this);
    // this.events = events;
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
    /**
     * Rate instance
     * @type {?Rate}
     */
    _this.rate = rate;
    /**
     * scrolling 監視開始 flag
     * @type {boolean}
     * @since 0.3.8
     */
    _this.watching = false;
    /**
     * bind onNativeEvent - window.onscroll|onresize event handler
     * @type {function}
     */
    _this.onNativeEvent = _this.onNativeEvent.bind(_this);
    return _this;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  // /**
  //  * fps で発生するイベントを取得します
  //  * @event SCROLL
  //  * @returns {string} event, scrollingScroll を返します
  //  * @default scrollingScroll
  //  */
  // static get UPDATE() {
  //   return 'scrollingUpdate';
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * window.onscroll / window.onresize event handler,
   * `this.watching` flag を確認し `watch` を call します
   * @since 0.3.8
   */

  // ---------------------------------------------------
  //  CONSTANT / EVENT
  // ---------------------------------------------------
  /**
   * fps: {@link Rate} で発生するイベント - scrollingUpdate
   * @event UPDATE
   */


  _createClass(Scrolling, [{
    key: 'onNativeEvent',
    value: function onNativeEvent() {
      if (!this.watching) {
        this.watch();
      }
    }
    /**
     * window.onscroll / window.onresize 監視を開始します
     * @returns {Scrolling} method chain 可能なように instance を返します
     */

  }, {
    key: 'start',
    value: function start() {
      window.addEventListener('scroll', this.onNativeEvent, false);
      window.addEventListener('resize', this.onNativeEvent, false);
      return this;
    }
    /**
     * window.onscroll / window.onresize 監視を停止します
     * @returns {Scrolling} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('scroll', this.onNativeEvent);
      window.removeEventListener('resize', this.onNativeEvent);
      return this;
    }
    /**
     * fps を監視しスクロール位置を知らせます
     * @returns {Scrolling} method chain 可能なように instance を返します
     * @since 0.3.8
     */

  }, {
    key: 'watch',
    value: function watch() {
      this.unwatch();
      this.watching = true;
      this.rate.on(_Rate2.default.UPDATE, this.onUpdate);
      // rate.start();
      return this;
    }
    /**
     * fps 監視を止めます
     * @returns {Scrolling} method chain 可能なように instance を返します
     * @since 0.3.8
     */

  }, {
    key: 'unwatch',
    value: function unwatch() {
      this.rate.off(_Rate2.default.UPDATE, this.onUpdate);
      this.watching = false;
      return this;
    }
    /**
     * 指定 rate(fps) 毎にスクロール位置を<br>
     * scroll top 位置をもたせた Scrolling.UPDATE custom event を発火します
     *
     * 下記のプロパティをイベント・インスタンスに追加します
     *
     * - original {Events} - Rate Events instance
     * - y {number} - scroll top
     * - height {number} - window height
     * - width {number} - window width
     * - bottom {number} - window bottom 位置 (y + height)
     * - previous {number} - 前回の scroll top
     * - moving {number} - 前回からの移動量, 正: scroll down, 負: scroll up
     * - wide {boolean} - width が 768 以上の時に true
     * - changed {boolean} - scroll top が前回と変わっていたら true
     *
     * @param {?Events} event {@link Rate.UPDATE} Events instance
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(event) {
      // @type {number} - scroll top
      var y = _Scroll2.default.y();
      // @type {number} - previous scroll top
      var previous = this.previous;
      // @type {boolean} - 移動したかを表します,
      var changed = event === null || previous !== y;
      // 移動量 0 の時は rate 監視を停止する
      if (!changed) {
        this.unwatch();
      }
      // @type {number} - window height
      var height = window.innerHeight;
      // @type {number} - window width
      var width = window.innerWidth;

      // @type {ScrollEvents} - events
      var events = this.events;

      // @type {Event} - Rate Events instance
      events.original = event;
      // @type {number} - scroll top
      events.y = y;
      // @type {number} - window height
      events.height = height;
      // @type {number} - window width
      events.width = width;
      // @type {number} - window bottom(y + height)
      events.bottom = y + height;
      // @type {boolean} - 移動したかを表します,
      // event が null の時は強制発火なので移動量 0 （scroll top 位置に変更がない）でも changed を true にします
      events.changed = changed;
      // @type {number} - 前回の y 位置
      events.previous = previous;
      // @type {number} - 移動量 +: down, -: up
      events.moving = y - previous;
      // event fire
      // console.log('Scrolling.scroll', events);
      this.dispatch(events);

      // save scroll top -> previous
      this.previous = y;
    }
    /**
     * 強制的に Scrolling.SCROLL event を発火させます
     */

  }, {
    key: 'fire',
    value: function fire() {
      this.onUpdate(null);
    }
  }]);

  return Scrolling;
}(_EventDispatcher3.default);

Scrolling.UPDATE = 'scrollingUpdate';
exports.default = Scrolling;