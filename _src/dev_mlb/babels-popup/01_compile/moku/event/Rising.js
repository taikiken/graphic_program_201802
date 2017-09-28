'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scrolling = require('./Scrolling');

var _Scrolling2 = _interopRequireDefault(_Scrolling);

var _EventDispatcher2 = require('./EventDispatcher');

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

var _RisingEvents = require('./events/RisingEvents');

var _RisingEvents2 = _interopRequireDefault(_RisingEvents);

var _Hit = require('../util/Hit');

var _Hit2 = _interopRequireDefault(_Hit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2011-2016 inazumatv.com, inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/11/30 - 14:37
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Distributed under the terms of the MIT license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://www.opensource.org/licenses/mit-license.html
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This notice shall be included in all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// event

// import Events from './Events';


// hit


/**
 * {@link Scrolling} class を使用しスクロールトップ位置をチェクし対象 element と window の衝突判定を {@link Hit.test} で行います
 */
var Rising = function (_EventDispatcher) {
  _inherits(Rising, _EventDispatcher);

  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * elements instance と scrolling instance を保存します
   * @param {Elements} elements 対象 element を Elements インスタンスに変換します
   * @param {Scrolling} scrolling スクロールトップ監視インスタンス
   */

  // ----------------------------------------
  // STATIC EVENT
  // ----------------------------------------
  /**
   * 衝突イベント - risingCollision
   * @event COLLISION
   * @type {string}
   */
  function Rising(elements) {
    var scrolling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Scrolling2.default();

    _classCallCheck(this, Rising);

    /**
     * 対象 element を Elements インスタンスに変換します
     * @type {elements}
     */
    var _this = _possibleConstructorReturn(this, (Rising.__proto__ || Object.getPrototypeOf(Rising)).call(this));

    _this.elements = elements;
    /**
     * スクロールトップ監視インスタンス
     * @type {Scrolling}
     */
    _this.scrolling = scrolling;
    // const boundScroll = this.scroll.bind(this);
    /**
     * bound onUpdate, Rate.UPDATE event handler
     * @type {function}
     */
    _this.onUpdate = _this.onUpdate.bind(_this);
    // this.boundScroll = boundScroll;
    // /**
    //  * start 済みフラッグ
    //  * @type {boolean}
    //  * @default false
    //  */
    // this.started = false;
    /**
     * Rising.[COLLISION|ALIEN] event instance
     * @type {RisingEvents}
     */
    _this.events = new _RisingEvents2.default(Rising.COLLISION, _this, _this);
    return _this;
  }
  // // ----------------------------------------
  // // EVENT
  // // ----------------------------------------
  // /**
  //  * 衝突イベント
  //  * @event COLLISION
  //  * @return {string} risingCollision を返します
  //  */
  // static get COLLISION() {
  //   return 'risingCollision';
  // }
  // /**
  //  * 衝突「していない」イベント
  //  * @event ALIEN
  //  * @return {string} risingAlien を返します
  //  */
  // static get ALIEN() {
  //   return 'risingAlien';
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * scroll を監視します
   * @returns {Rising} method chain 可能なように instance を返します
   */

  /**
   * 衝突「していない」イベント - risingAlien
   * @event ALIEN
   * @type {string}
   */


  _createClass(Rising, [{
    key: 'start',
    value: function start() {
      // // flag check
      // if (this.started) {
      //   return this;
      // }
      // this.started = true;
      // // scrolling
      // const scrolling = this.scrolling;
      // scrolling.on(Scrolling.UPDATE, this.onUpdate);
      // scrolling.start();
      this.stop();
      this.scrolling.on(_Scrolling2.default.UPDATE, this.onUpdate);
      return this;
    }
    /**
     * scroll 監視を止めます
     * @returns {Rising} method chain 可能なように instance を返します
     */

  }, {
    key: 'stop',
    value: function stop() {
      // if (!this.started) {
      //   return this;
      // }
      // this.started = false;
      // const scrolling = this.scrolling;
      this.scrolling.off(_Scrolling2.default.UPDATE, this.onUpdate);
      return this;
    }
    /**
     * Scrolling.UPDATE event handler - {link Hit.test} 衝突判定を行います
     * @param {ScrollEvents} scrollEvents scroll events object
     * @return {boolean} 衝突時に true を返します
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(scrollEvents) {
      if (!scrollEvents.changed) {
        return false;
      }
      // element offset
      var offset = this.elements.offset();
      // hit result
      var hit = _Hit2.default.test(scrollEvents.height, offset);
      // // @type {?Elements}
      // let events = null;
      // if (hit.result) {
      //   events = new Events(Rising.COLLISION, this, this);
      // } else {
      //   events = new Events(Rising.ALIEN, this, this);
      // }
      var events = this.events;
      events.type = hit.result ? Rising.COLLISION : Rising.ALIEN;
      // hit / original / offset を追加します
      events.hit = hit;
      events.original = scrollEvents;
      events.offset = offset;
      // 発火
      this.dispatch(events);
      return hit.result;
    }
  }]);

  return Rising;
}(_EventDispatcher3.default);

Rising.COLLISION = 'risingCollision';
Rising.ALIEN = 'risingAlien';
exports.default = Rising;