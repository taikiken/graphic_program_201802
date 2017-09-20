'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scrolling2 = require('./Scrolling');

var _Scrolling3 = _interopRequireDefault(_Scrolling2);

var _Scroll = require('./Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _ResizingEvents = require('./events/ResizingEvents');

var _ResizingEvents2 = _interopRequireDefault(_ResizingEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/08/03 - 19:33
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event


// event/events


/**
 * resize のみを監視します
 */
var Resizing = function (_Scrolling) {
  _inherits(Resizing, _Scrolling);

  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * events instance を準備します
   */
  function Resizing() {
    _classCallCheck(this, Resizing);

    // ------
    /**
     * Resizing event を準備します
     * @type {ScrollEvents}
     */
    var _this = _possibleConstructorReturn(this, (Resizing.__proto__ || Object.getPrototypeOf(Resizing)).call(this));

    _this.events = new _ResizingEvents2.default(Resizing.UPDATE, _this, _this);
    // console.log('Resizing events', this.events);
    /**
     * document.body size - clientWidth / clientHeight
     * @type {{width: number, height: number}}
     */
    _this.body = {
      width: -1,
      height: -1
    };
    /**
     * window innerWidth / innerHeight
     * @type {{width: number, height: number}}
     */
    _this.window = {
      width: -1,
      height: -1
    };
    /**
     * 前回スクロールトップ値
     * @type {number}
     */
    _this.previous = -1;
    return _this;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 監視を開始します
   * - 常時監視します - document.body.onresize が作動しないため
   * @returns {*} method chain 可能なように instance を返します
   */

  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * Resizing event type - resizingUpdate
   * @event UPDATE
   * @type {string}
   */


  _createClass(Resizing, [{
    key: 'start',
    value: function start() {
      this.watch();
      return this;
    }
    /**
     * 監視を停止します
     * @returns {*} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.unwatch();
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
      // --- [window]
      // @type {number} - window width
      var width = window.innerWidth;
      // @type {number} - window height
      var height = window.innerHeight;
      // --- [body]
      var bodyWidth = document.body.clientWidth;
      var bodyHeight = document.body.clientHeight;
      // @type {boolean} - 移動したかを表します,
      var changed = event === null || previous !== y || height !== this.window.height || width !== this.window.width || bodyWidth !== this.body.width || bodyHeight !== this.body.height;
      // ----------------------------------------------
      // @type {ScrollEvents} - events
      var events = this.events.clone();
      // @type {Event} - Rate Events instance
      events.original = event;
      // @type {number} - scroll top
      events.y = y;
      // @type {number} - window height
      events.height = height;
      // @type {number} - window width
      events.width = width;
      // -- body
      events.bodyWidth = bodyWidth;
      events.bodyHeight = bodyHeight;
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
      // console.log('Resizing.onUpdate', events);
      this.dispatch(events);
      // ----------------------------------------------
      this.window.width = width;
      this.window.height = height;
      this.body.width = bodyWidth;
      this.body.height = bodyHeight;
      // save scroll top -> previous
      this.previous = y;
      // // 移動量 0 の時は rate 監視を停止する
      // if (!changed) {
      //   this.unwatch();
      // }
    }
  }]);

  return Resizing;
}(_Scrolling3.default);

Resizing.UPDATE = 'resizingUpdate';
exports.default = Resizing;