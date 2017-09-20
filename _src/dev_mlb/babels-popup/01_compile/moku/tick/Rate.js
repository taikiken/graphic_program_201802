'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = require('../event/Events');

var _Events2 = _interopRequireDefault(_Events);

var _Polling2 = require('./Polling');

var _Polling3 = _interopRequireDefault(_Polling2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author (at)taikiken / http://inazumatv.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016/07/16
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
 * 固定値を使用し fps を決定します
 *
 * 以下のフレームレートが設定可能です
 *
 * - 60: Rate.RATE_60
 * - 30: RATE_30
 * - 20: RATE_20
 * - 15: RATE_15
 * - 12: RATE_12
 * - 10: RATE_10
 * - 6: RATE_6
 * - 5: RATE_5
 *
 * @example
 * // 1sec interval
 * const rate = new Rate(Rate.Rate_60);
 * const update = () => {
 *  // code here, something do
 * };
 * rate.on(Rate.UPDATE, update);
 * rate.start();
 */
var Rate = function (_Polling) {
  _inherits(Rate, _Polling);

  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 固定値フレームレート毎に UPDATE イベントを発生させます
   * @param {number} [rateValue=Rate.RATE_5] fps, 固定値以外設定できません
   */

  /**
   * fps 1 基準値
   * @type {number}
   */

  /**
   * fps 3 基準値
   * @type {number}
   */

  /**
   * fps 5 基準値
   * @type {number}
   */

  /**
   * fps 10 基準値
   * @type {number}
   */

  /**
   * fps 15 基準値
   * @type {number}
   */

  /**
   * fps 30 基準値
   * @type {number}
   */
  function Rate() {
    var rateValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Rate.RATE_5;

    _classCallCheck(this, Rate);

    // @type {Events}
    var _this = _possibleConstructorReturn(this, (Rate.__proto__ || Object.getPrototypeOf(Rate)).call(this, 1000 / 60));
    // 60fps で polling を行う


    var events = new _Events2.default(Rate.UPDATE, _this, _this);
    // 設定可能な rate list
    var rates = [Rate.RATE_60, Rate.RATE_30, Rate.RATE_20, Rate.RATE_15, Rate.RATE_12, Rate.RATE_10, Rate.RATE_6, Rate.RATE_5, Rate.RATE_4, Rate.RATE_3, Rate.RATE_2, Rate.RATE_1];
    /**
     * Rate 通知 Events instance
     * @type {Events}
     */
    _this.events = events;
    /**
     * 許容可能な rate
     * @type {Array<number>}
     */
    _this.rates = rates;
    /**
     * rate count, update 毎にカウントアップします<br>
     * 不正値の時は `Rate.RATE_5` を使用します
     * @type {number}
     */
    _this.count = 0;
    // let rate = this.validate(rateValue) ? rateValue : Rate.RATE_5;
    /**
     * rate 値
     * @type {?number}
     * @default Rate.RATE_5
     */
    _this.rate = _this.validate(rateValue) ? rateValue : Rate.RATE_5;
    return _this;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * rate 値を設定します
   * - 正常値: `this.rate` 更新, value を返します
   * - 不正値: `this.rate` 更新しません, null を返します
   * @param {number} value rate 値
   * @returns {?number} 正しい rate は設定値を不正な時は null を返します
   */

  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * フレームレート毎に発生するイベント - rateUpdate
   * @event UPDATE
   * @type {string}
   */

  /**
   * fps 2 基準値
   * @type {number}
   */

  /**
   * fps 4 基準値
   * @type {number}
   */

  /**
   * fps 6 基準値
   * @type {number}
   */

  /**
   * fps 12 基準値
   * @type {number}
   */

  /**
   * fps 20 基準値
   * @type {number}
   */

  // ----------------------------------------
  // CONST
  // ----------------------------------------
  /**
   * fps 60 基準値
   * @type {number}
   */


  _createClass(Rate, [{
    key: 'setRate',
    value: function setRate(value) {
      if (this.validate(value)) {
        this.rate = value;
        return value;
      }
      return null;
    }
    /**
     * 正規な rate 値かをチェックします
     * @param {number} rate 対象 rate
     * @returns {boolean} 正しいと true を返します
     */

  }, {
    key: 'validate',
    value: function validate(rate) {
      return this.rates.indexOf(rate) !== -1;
    }
    /**
     * fps 基準値を設定します
     * @throws {Error} 引数 rate が設定可能値以外の時に例外エラーが発生します
     * @param {number} rate fps 基準値, <br>
     * RATE_60, RATE_30, RATE_20, RATE_15, RATE_12, RATE_10, <br>
     * RATE_6, RATE_5, RATE_4, RATE_3, RATE_2, RATE_1 の何れかが必須です
     * @returns {boolean} rate 設定に成功すると true を返します
     */

  }, {
    key: 'change',
    value: function change(rate) {
      this.setRate(rate);
      return this.start();
    }
    /**
     * {@link Polling}.UPDATE event handler
     *
     * count property を `+1` 加算後設定 rate で割り算し余りが `0` の時にイベント Rate.UPDATE を発生させます
     * @returns {boolean} Rate.UPDATE event が発生すると true を返します
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate() {
      // 余りが 0 の時にイベントを発火します
      this.count += 1;
      var reminder = this.count % this.rate;
      if (reminder === 0) {
        this.count = 0;
        this.fire(this.updateEvents(0, 0));
        return true;
      }
      return false;
    }
  }]);

  return Rate;
}(_Polling3.default);

Rate.RATE_60 = 1;
Rate.RATE_30 = 2;
Rate.RATE_20 = 3;
Rate.RATE_15 = 4;
Rate.RATE_12 = 5;
Rate.RATE_10 = 6;
Rate.RATE_6 = 10;
Rate.RATE_5 = 12;
Rate.RATE_4 = 15;
Rate.RATE_3 = 20;
Rate.RATE_2 = 30;
Rate.RATE_1 = 60;
Rate.UPDATE = 'rateUpdate';
exports.default = Rate;