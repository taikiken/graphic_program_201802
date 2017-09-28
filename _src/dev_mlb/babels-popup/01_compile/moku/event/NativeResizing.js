'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scroll = require('./Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _Resizing = require('./Resizing');

var _Resizing2 = _interopRequireDefault(_Resizing);

var _ResizingEvents = require('./events/ResizingEvents');

var _ResizingEvents2 = _interopRequireDefault(_ResizingEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2017 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/08/29 - 15:34
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
 * requestAnimationFrame が使えない奴のための resize 監視クラス
 * - {@link Scrolling}, {@link Resizing} class 代替します
 */
var NativeResizing = function (_EventDispatcher) {
  _inherits(NativeResizing, _EventDispatcher);

  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * events instance を準備します
   */
  function NativeResizing() {
    _classCallCheck(this, NativeResizing);

    // ------
    /**
     * Resizing event を準備します
     * @type {ScrollEvents}
     */
    var _this = _possibleConstructorReturn(this, (NativeResizing.__proto__ || Object.getPrototypeOf(NativeResizing)).call(this));

    _this.events = new _ResizingEvents2.default(_Resizing2.default.UPDATE, _this, _this);
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
    /**
     * 500ms timeout timer id
     * @type {number}
     */
    _this.timer = 0;
    /**
     * bind onUpdate - scroll / resize / timer handler
     * @type {function}
     */
    _this.onUpdate = _this.onUpdate.bind(_this);
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


  _createClass(NativeResizing, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.stop();
      window.addEventListener('scroll', this.onUpdate, false);
      window.addEventListener('resize', this.onUpdate, false);
      this.timer = setTimeout(function () {
        _this2.onUpdate();
      }, 500);
      return this;
    }
    /**
     * 監視を停止します
     * @returns {*} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      clearTimeout(this.timer);
      window.removeEventListener('scroll', this.onUpdate);
      window.removeEventListener('resize', this.onUpdate);
      return this;
    }
    /**
     * 下記のプロパティをイベント・インスタンスに追加します
     * - original {Events} - Rate Events instance
     * - y {number} - scroll top
     * - height {number} - window height
     * - width {number} - window width
     * - bottom {number} - window bottom 位置 (y + height)
     * - previous {number} - 前回の scroll top
     * - moving {number} - 前回からの移動量, 正: scroll down, 負: scroll up
     * - wide {boolean} - width が 768 以上の時に true
     * - changed {boolean} - scroll top が前回と変わっていたら true
     * @param {?Event} [event] scroll / resize Event
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
    }
    /**
     * 強制 update
     */

  }, {
    key: 'fire',
    value: function fire() {
      this.onUpdate(null);
    }
  }]);

  return NativeResizing;
}(_EventDispatcher3.default);

exports.default = NativeResizing;