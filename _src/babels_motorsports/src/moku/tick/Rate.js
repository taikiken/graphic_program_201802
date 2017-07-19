/**
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
import Events from '../event/Events';

// tick
import Polling from './Polling';

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
export default class Rate extends Polling {
  // ----------------------------------------
  // CONST
  // ----------------------------------------
  /**
   * fps 60 基準値を取得します
   * @const RATE_60
   * @returns {number} fps 60 基準値を返します
   * @default 1
   */
  static get RATE_60() {
    return 1;
  }  /**
   * fps 30 基準値を取得します
   * @const RATE_30
   * @returns {number} fps 30 基準値を返します
   * @default 2
   */
  static get RATE_30() {
    return 2;
  }
  /**
   * fps 20 基準値を取得します
   * @const RATE_20
   * @returns {number} fps 20 基準値を返します
   * @default 3
   */
  static get RATE_20() {
    return 3;
  }
  /**
   * fps 15 基準値を取得します
   * @const RATE_15
   * @returns {number} fps 15 基準値を返します
   * @default 4
   */
  static get RATE_15() {
    return 4;
  }
  /**
   * fps 12 基準値を取得します
   * @const RATE_12
   * @returns {number} fps 12 基準値を返します
   * @default 5
   */
  static get RATE_12() {
    return 5;
  }
  /**
   * fps 10 基準値を取得します
   * @const RATE_10
   * @returns {number} fps 10 基準値を返します
   * @default 6
   */
  static get RATE_10() {
    return 6;
  }
  /**
   * fps 6 基準値を取得します
   * @const RATE_6
   * @returns {number} fps 6 基準値を返します
   * @default 10
   */
  static get RATE_6() {
    return 10;
  }
  /**
   * fps 5 基準値を取得します
   * @const RATE_5
   * @returns {number} fps 6 基準値を返します
   * @default 12
   */
  static get RATE_5() {
    return 12;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * フレームレート毎に発生するイベント type を取得します
   * @event UPDATE
   * @returns {string} event, rateUpdate を返します
   * @default rateUpdate
   */
  static get UPDATE() {
    return 'rateUpdate';
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 固定値フレームレート毎に UPDATE イベントを発生させます
   * @param {number} [rateValue=Rate.RATE_5] fps, 固定値以外設定できません
   */
  constructor(rateValue = Rate.RATE_5) {
    // 60fps で polling を行う
    super(1000 / 60);
    // @type {Events}
    const events = new Events(Rate.UPDATE, this, this);
    // 設定可能な rate list
    const rates = [
      Rate.RATE_60,
      Rate.RATE_30,
      Rate.RATE_20,
      Rate.RATE_15,
      Rate.RATE_12,
      Rate.RATE_10,
      Rate.RATE_6,
      Rate.RATE_5,
    ];
    /**
     * Rate 通知 Events instance
     * @type {Events}
     */
    this.events = events;
    /**
     * 許容可能な rate
     * @type {Array<number>}
     */
    this.rates = rates;
    /**
     * rate count, update 毎にカウントアップします<br>
     * 不正値の時は `Rate.RATE_5` を使用します
     * @type {number}
     */
    this.count = 0;
    // let rate = this.validate(rateValue) ? rateValue : Rate.RATE_5;
    /**
     * rate 値
     * @type {?number}
     * @default Rate.RATE_5
     */
    this.rate = this.validate(rateValue) ? rateValue : Rate.RATE_5;
    // this.rate = rate;
    // /**
    //  * rate 値を設定します
    //  * @param {number} value rate 値
    //  * @returns {boolean} rate 設定に成功すると true を返します
    //  */
    // this.setRate = (value) => {
    //   if (this.validate(value)) {
    //     rate = value;
    //     return true;
    //   }
    //   return false;
    // };
    // init
    this.setRate(rateValue);
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
  setRate(value) {
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
  validate(rate) {
    return this.rates.indexOf(rate) !== -1;
  }
  /**
   * fps 基準値を設定します
   * @throws {Error} 引数 rate が設定可能値以外の時に例外エラーが発生します
   * @param {number} rate fps 基準値, <br>
   * this.RATE_30, this.RATE_20, this.RATE_15, this.RATE_12, this.RATE_10, <br>
   * this.RATE_6, this.RATE_5 の何れかが必須です
   * @returns {boolean} rate 設定に成功すると true を返します
   */
  change(rate) {
    const result = this.setRate(rate);
    this.update();
    return result !== null;
  }
  /**
   * loop(requestAnimationFrame) を開始します
   * @returns {boolean} start に成功すると true を返します
   */
  start() {
    if (this.started) {
      // already start
      return false;
    }
    // flag -> true
    this.turnOver();
    // cycle
    this.initCycle();
    // 強制的に1回目を実行
    this.fire(this.updateEvents(0, 0));
    return true;
  }
  /**
   * loop(requestAnimationFrame) します
   * @returns {boolean} Rate.UPDATE event が発生すると true を返します
   */
  update() {
    // 余りが 0 の時にイベントを発火します
    this.count += 1;
    const reminder = this.count % this.rate;
    if (reminder === 0) {
      this.count = 0;
      this.fire(this.updateEvents(0, 0));
      return true;
    }
    return false;
  }
}
