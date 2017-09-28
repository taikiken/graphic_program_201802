'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _TouchingEvents = require('./events/TouchingEvents');

var _TouchingEvents2 = _interopRequireDefault(_TouchingEvents);

var _Vectors = require('../util/Vectors');

var _Vectors2 = _interopRequireDefault(_Vectors);

var _Type = require('../util/Type');

var _Type2 = _interopRequireDefault(_Type);

var _Can = require('../device/Can');

var _Can2 = _interopRequireDefault(_Can);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/10/08
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2015 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * f
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event


// util


// device


// touchevent 3rd argument
/**
 * addEventListener 第三引数 - { passive: true } | false
 * @private
 * @type {*}
 * @since 0.3.2
 */
var event3rd = _Can2.default.passive() ? { passive: true } : false;

/**
 * Touch event を監視し y方向移動が `threshold` 以内の時に `TOUCH` event を発火します
 */

var Touching = function (_EventDispatcher) {
  _inherits(Touching, _EventDispatcher);

  _createClass(Touching, null, [{
    key: 'scrolling',

    // ----------------------------------------
    // STATIC METHOD
    // ----------------------------------------
    /**
     * y 方向移動が threshold 以内か判定します
     * @param {Vectors} pointA スタートポイント(Vectors)
     * @param {Vectors} pointB エンドポイント(Vectors)
     * @param {number} threshold 閾値
     * @returns {boolean} true の時は閾値以上なのでスクロール判定になります
     */

    /**
     * touchmove event type - touchingMove
     * @constant MOVE
     * @type {string}
     */

    /**
     * touchend event type - touchingEnd
     * @constant END
     * @type {string}
     */
    value: function scrolling(pointA, pointB, threshold) {
      var y = pointA.betweenY(pointB);
      // 正数値にし閾値と比較
      return Math.abs(y) >= threshold;
    }
    /**
     * MouseEvent|TouchEvent から pageX / pageY 座標を取得します
     * @param {MouseEvent|TouchEvent} event down / move / up event object
     * @returns {{x: number, y: number}} pageX / pageY 座標を返します
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches
     */

    /**
     * touch event type - touchingTouch
     * @constant TOUCH
     * @type {string}
     */

    /**
     * touchcancel event type - touchingCancel
     * @constant CANCEL
     * @type {string}
     */

    // ---------------------------------------------------
    //  CONSTANT / EVENT
    // ---------------------------------------------------
    /**
     * touchstart event type - touchingStart
     * @constant START
     * @type {string}
     */

  }, {
    key: 'point',
    value: function point(event) {
      var x = event.pageX;
      var y = event.pageY;

      // event.pageX / pageY があればそのまま値を返します
      // Android で pageX / pageY 存在しても 0, 0 しか返さない端末あり
      if (_Type2.default.number(x) && _Type2.default.number(y) && x !== 0 && y !== 0) {
        return { x: x, y: y };
      }

      // event.pageX / pageY がない時は TouchEvent の changedTouches から取得します
      // touch event
      // @type {TouchList}
      var touches = event.changedTouches || event.touches;
      // touches が取得できない時は 0 をセットし返します
      if (!_Type2.default.exist(touches) || touches.length === 0) {
        return { x: 0, y: 0 };
      }

      // changedTouches list の先頭データを取り出し pageX / pageY を取得します
      // @type {Touch}
      var touch = touches[0];
      return { x: touch.pageX, y: touch.pageY };
    }
    // ---------------------------------------------------
    //  CONSTRUCTOR
    // ---------------------------------------------------
    /**
     * 処理対象 element などを保存します
     * @param {Element} element 処理対象 Element
     * @param {boolean} [canceling=false] touchmove 中に `preventDefault` を行うフラッグ
     * false の時は {@link Can.passive} を調べ可能なら `{ passive: true }` します - since 0.3.2
     * @param {number} [threshold=10] y 方向閾値
     */

  }]);

  function Touching(element) {
    var canceling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    _classCallCheck(this, Touching);

    /**
     * 処理対象 Element
     * @type {Element}
     */
    var _this = _possibleConstructorReturn(this, (Touching.__proto__ || Object.getPrototypeOf(Touching)).call(this));

    _this.element = element;
    /**
     * touchmove 中に `preventDefault` を行うかのフラッグ
     * @type {boolean}
     * @default false
     */
    _this.canceling = canceling;
    /**
     * y 方向閾値, default: 10px
     * @type {number}
     * @default 10
     */
    _this.threshold = threshold;
    // @type {function}
    // const onStart = this.onStart.bind(this);
    /**
     * bound onStart
     * @type {function}
     */
    _this.onStart = _this.onStart.bind(_this);
    // this.onStart = () => onStart;
    // const onMove = this.onMove.bind(this);
    /**
     * bound onMove
     * @type {function}
     */
    _this.onMove = _this.onMove.bind(_this);
    // this.onMove = () => onMove;
    // const onEnd = this.onEnd.bind(this);
    /**
     * bound onEnd
     * @type {function}
     */
    _this.onEnd = _this.onEnd.bind(_this);
    // this.onEnd = () => onEnd;
    // const onCancel = this.onCancel.bind(this);
    /**
     * bound onCancel
     * @type {function}
     */
    _this.onCancel = _this.onCancel.bind(_this);
    // this.onCancel = () => onCancel;
    // const onBlur = this.onBlur.bind(this);
    /**
     * bound onBlur
     * @type {function}
     */
    _this.onBlur = _this.onBlur.bind(_this);
    // this.onBlur = () => onBlur;
    // const vectors = {
    //   start: new Vectors(),
    //   end: new Vectors(),
    //   moving: [].slice(0),
    // };
    /**
     * 位置管理を行う Vectors instance を含む object
     * @type {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
     */
    _this.vectors = {
      start: new _Vectors2.default(),
      end: new _Vectors2.default(),
      moving: [].slice(0)
    };
    /**
     * TouchEvent listener 3rd argument, option | useCapture
     * @type {boolean}
     */
    _this.eventOption = canceling ? false : event3rd;
    /**
     * [native code] - document.body
     * @type {HTMLElement}
     */
    _this.body = document.body;
    return _this;
  }
  // // ---------------------------------------------------
  // //  EVENT
  // // ---------------------------------------------------
  // /**
  //  * touchstart event type
  //  * @event START
  //  * @returns {string} touchingStart を返します
  //  */
  // static get START() {
  //   return 'touchingStart';
  // }
  // /**
  //  * touchend event type
  //  * @event END
  //  * @returns {string} touchingEnd を返します
  //  */
  // static get END() {
  //   return 'touchingEnd';
  // }
  // /**
  //  * touchend event type
  //  * @event CANCEL
  //  * @returns {string} touchingCancel を返します
  //  */
  // static get CANCEL() {
  //   return 'touchingCancel';
  // }
  // /**
  //  * touchmove event type
  //  * @event MOVE
  //  * @returns {string} touchingMove を返します
  //  */
  // static get MOVE() {
  //   return 'touchingMove';
  // }
  // /**
  //  * touch(click) event type
  //  * @event TOUCH
  //  * @returns {string} touchingTouch を返します
  //  */
  // static get TOUCH() {
  //   return 'touchingTouch';
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 初期処理<br>
   * element への `touchstart` と<br>
   * window.blur event をそれぞれ bind します
   * @returns {void}
   */


  _createClass(Touching, [{
    key: 'init',
    value: function init() {
      this.element.addEventListener('touchstart', this.onStart, this.eventOption);
      window.addEventListener('blur', this.onBlur, false);
    }
    // event handlers
    // ---------------------------------------------------
    /**
     * touchstart event handler
     * @param {Event|TouchEvent} event touchstart event
     * @returns {void}
     */

  }, {
    key: 'onStart',
    value: function onStart(event) {
      // event unbind <- 二重 bind にならないように
      this.dispose();
      // vectors を初期化
      this.reset();
      // 現在 position を保存
      var vectors = this.vectors;
      var point = Touching.point(event);
      vectors.start.update(point.x, point.y);
      vectors.moving.push(vectors.start);

      // キャンセル event 監視を開始
      var eventOption = this.eventOption;
      var body = this.body;
      body.addEventListener('touchend', this.onEnd, eventOption);
      body.addEventListener('touchmove', this.onMove, eventOption);
      body.addEventListener('touchcancel', this.onCancel, eventOption);

      // Touching.START 発火
      this.dispatch(new _TouchingEvents2.default(Touching.START, this, event, vectors.start));
    }
    /**
     * touchmove event handler
     * @param {Event} event touchmove event
     * @returns {void}
     */

  }, {
    key: 'onMove',
    value: function onMove(event) {
      // console.log('Touching.onMove', event);
      var vectors = this.vectors;
      var movingArray = vectors.moving;

      // 現在 position
      var point = Touching.point(event);
      var position = new _Vectors2.default(point.x, point.y, Date.now());

      // 前回 position <- moving 配列最後
      var previous = movingArray.pop();
      // 戻す
      movingArray.push(previous);

      // scroll checked
      var scrolling = Touching.scrolling(position, previous, this.threshold);
      position.scrolling = scrolling;
      // 現在 position を配列後ろにセット
      movingArray.push(position);

      // global cancel と 閾値チェックで `preventDefault` を実行し scroll を止める
      if (this.canceling && !scrolling) {
        event.preventDefault();
      }

      // 移動量
      var between = position.between(previous);

      // Touching.MOVE 発火
      this.dispatch(new _TouchingEvents2.default(Touching.MOVE, this, event, position, between, scrolling));
    }
    /**
     * touchend event handler
     * @param {Event} event touchend event
     * @returns {void}
     */

  }, {
    key: 'onEnd',
    value: function onEnd(event) {
      // console.log('Touching.onEnd', event);
      var vectors = this.vectors;

      // 現在 position
      var point = Touching.point(event);
      var position = new _Vectors2.default(point.x, point.y, Date.now());

      // 前回 position を touchstart 位置としチェックします
      var previous = vectors.start;
      var scrolling = Touching.scrolling(position, previous, this.threshold);
      position.scrolling = scrolling;

      // global cancel と 閾値チェックで `preventDefault` を実行し scroll を止める
      if (this.canceling && !scrolling) {
        event.preventDefault();
      }

      // 移動量
      var between = position.between(previous);

      // Touching.END 発火
      this.dispatch(new _TouchingEvents2.default(Touching.END, this, event, position, between, scrolling));

      // Touching.Touch 発火
      this.dispatch(new _TouchingEvents2.default(Touching.TOUCH, this, event, position, between, scrolling));
    }
    /**
     * touchcancel event handler<br>
     * 処理をキャンセルします
     * @param {Event} event touchend event
     * @returns {boolean} 正常終了時に true を返します
     */

  }, {
    key: 'onCancel',
    value: function onCancel(event) {
      return this.abort(event);
    }
    /**
     * window.blur event handler<br>
     * 処理をキャンセルします
     * @param {Event} event window blur event
     * @returns {boolean} 正常終了時に true を返します
     */

  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      return this.abort(event);
    }
    // 処理
    // ---------------------------------------------------
    /**
     * touch event での処理をキャンセルし、設定値を初期値に戻します
     * @param {Event} event touch / window.onblur Event
     * @returns {boolean} 正常終了時に true を返します
     */

  }, {
    key: 'abort',
    value: function abort(event) {
      this.dispose();
      this.reset();
      this.dispatch(new _TouchingEvents2.default(Touching.CANCEL, this, event));
      return true;
    }
    /**
     * bind した event を unbind します
     * @returns {boolean} 正常終了時に true を返します
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      var body = this.body;

      body.removeEventListener('touchend', this.onEnd);
      body.removeEventListener('touchmove', this.onMove);
      body.removeEventListener('touchcancel', this.onCancel);
      return true;
    }
    /**
     * 移動監視に使用した vectors instance を全て reset します
     * @returns {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
     * reset 後の vectors object を返します
     */

  }, {
    key: 'reset',
    value: function reset() {
      var vectors = this.vectors;
      vectors.start.reset();
      vectors.end.reset();
      vectors.moving = [].slice(0);

      return vectors;
    }
  }]);

  return Touching;
}(_EventDispatcher3.default);

Touching.START = 'touchingStart';
Touching.END = 'touchingEnd';
Touching.CANCEL = 'touchingCancel';
Touching.MOVE = 'touchingMove';
Touching.TOUCH = 'touchingTouch';
exports.default = Touching;