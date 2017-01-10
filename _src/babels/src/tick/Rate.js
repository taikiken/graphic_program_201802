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
// import { default as Events } from '../event/Events';

// tick
import { Polling } from './Polling';

/**
 * private property key, fps を保存するための Symbol
 * @type {Symbol}
 * @private
 */
const rateSymbol = Symbol('save fps number');
/**
 * private property key, count を保存するための Symbol
 * @type {Symbol}
 * @private
 */
const countSymbol = Symbol('save count number');
/**
 * private property key, rates を保存するための Symbol
 * @type {Symbol}
 * @private
 */
const ratesSymbol = Symbol('save rates number');
/**
 * 固定値を使用し fps を決定します
 *
 * 以下のフレームレートが設定可能です
 *
 * - 60: RATE_60
 * - 30: RATE_30
 * - 20: RATE_20
 * - 15: RATE_15
 * - 12: RATE_12
 * - 10: RATE_10
 * - 6: RATE_6
 * - 5: RATE_5
 *
 * @since 2016-11-16
 */
export class Rate extends Polling {
  /**
   * 固定値フレームレート毎に UPDATE イベントを発生させます
   * @param {number} rate fps, 固定値以外設定できません
   */
  constructor(rate) {
    super(1);
    // @type {Events - Events
    // const events = new Events(Rate.UPDATE, this, this);
    // events.rate = rate;
    // /**
    //  * Rate.UPDATE Events instance
    //  * @type {Events}
    //  */
    // this.events = events;
    /**
     * event object
     * @type {{rate: number, type: string, target: Rate, currentTarget: Rate}}
     */
    this.events = {
      rate,
      type: Rate.UPDATE,
      target: this,
      currentTarget: this
    };

    // @type {number} - count, rate に達したかを計測するための counter 変数
    this[countSymbol] = 0;

    // correct rate list
    // サポートするレートリスト
    this[ratesSymbol] = [
      Rate.RATE_60,
      Rate.RATE_30,
      Rate.RATE_20,
      Rate.RATE_15,
      Rate.RATE_12,
      Rate.RATE_10,
      Rate.RATE_6,
      Rate.RATE_5,
    ];

    // frame rate
    this[rateSymbol] = 0;
    this.change(rate);
    // @type {function} - Cycle.UPDATE event handler
    /**
     * bound updtae
     * @type {function}
     */
    this.boundUpdate = this.update.bind(this);
  }
  // ----------------------------------------
  // CONST
  // ----------------------------------------
  /**
   * fps 30 基準値を取得します
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
   * @return {string} event, rateUpdate を返します
   * @default rateUpdate
   */
  static get UPDATE() {
    return 'rateUpdate';
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * fps 基準値リストを取得します
   * @returns {number} fps 基準値リストを返します
   */
  get rates() {
    return this[ratesSymbol];
  }
  /**
   * fps 基準値を取得します
   * @returns {number} fps 基準値を返します
   */
  get rate() {
    return this[rateSymbol];
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * fps 基準値を設定します
   * @throws {Error} 引数 rate が設定可能値以外の時に例外エラーが発生します
   * @param {number} rate fps 基準値, <br>
   * this.RATE_30, this.RATE_20, this.RATE_15, this.RATE_12, this.RATE_10, <br>
   * this.RATE_6, this.RATE_5 の何れかが必須です
   * @return {undefined} no-return
   */
  change(rate) {
    if (this.rates.indexOf(rate) !== -1) {
      this[rateSymbol] = rate;
    } else {
      throw new Error(`illegal rate: ${rate}. use const RATE_NN`);
    }
  }
  /**
   * loop(requestAnimationFrame) を開始します
   * @return {boolean} start に成功すると true を返します
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
    const count = this[countSymbol] + 1;
    this[countSymbol] = count;
    const remainder = count % this.rate;
    if (remainder === 0) {
      this[countSymbol] = 0;
      this.fire(this.updateEvents(0, 0));

      return true;
    }

    return false;
  }
}
