/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/07/03
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

// event
import EventDispatcher from '../event/EventDispatcher';
import Events from '../event/Events';

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('singleton instance');
/**
 * singleton instance, nullable
 * @type {?Cycle}
 * @private
 * @static
 */
let instance = null;

/**
 * <p>requestAnimationFrame を使用しループイベントを発生させます</p>
 * <p>singleton なので new ではなく factory を使用し instance を作成します</p>
 *
 * ```
 * const loop = Cycle.factory();
 * const update = () => {
 *  // code here, something do
 * };
 * loop.on(Cycle.UPDATE, update);
 * loop.start();
 * ```
 *
 * <p>requestAnimationFrame は tab が active(focus) な時のみ発生します</p>
 */
export default class Cycle extends EventDispatcher {
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @returns {Cycle} singleton instance を返します
   */
  constructor(checkSymbol) {
    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      return instance;
    }
    super();
    // -------------------------------
    // onetime setting
    instance = this;
    const events = new Events(Cycle.UPDATE, this, this);
    const boundUpdate = this.update.bind(this);
    /**
     * Cycle.UPDATE Events instance
     * @type {Events}
     */
    this.events = events;
    /**
     * bound update requestAnimationFrame callback
     * @type {function}
     */
    this.boundUpdate = boundUpdate;
    /**
     * requestAnimationFrame ID
     * @type {number}
     */
    this.id = 0;
    /**
     * start 済みフラッグ
     * @type {boolean}
     */
    this.started = false;
    // 設定済み instance を返します
    return instance;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * requestAnimationFrame 毎に発生するイベントを取得します
   * @event UPDATE
   * @returns {string} event, cycleUpdate を返します
   * @default cycleUpdate
   */
  static get UPDATE() {
    return 'cycleUpdate';
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * loop(requestAnimationFrame) を開始します
   * @returns {boolean} start に成功すると true を返します
   */
  start() {
    if (this.started) {
      // already start
      return false;
    }
    this.started = true;
    this.update();

    // @return
    return true;
  }
  /**
   * loop(cancelAnimationFrame) を止めます
   * @param {number} [id] requestAnimationFrame id を使い cancelAnimationFrame をします
   * @returns {boolean} stop に成功すると true を返します
   */
  stop(id = this.id) {
    if (!this.started) {
      // not start
      return false;
    }

    cancelAnimationFrame(id);
    this.started = false;

    // @return
    return true;
  }
  // ----------------------------------------
  // PRIVATE METHOD
  // ----------------------------------------
  /**
   * loop(requestAnimationFrame)コールバック関数<br>Cycle.UPDATE event を発火します
   * @returns {number} requestAnimationFrame ID
   */
  update() {
    // @type {number} - requestAnimationFrame id
    const id = requestAnimationFrame(this.boundUpdate);
    this.id = id;

    // @type {Events} - events
    const events = this.events;
    events.id = id;
    // event fire
    this.dispatch(events);
    return id;
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Cycle instance を singleton を保証し作成します
   * @returns {Cycle} Cycle instance を返します
   */
  static factory() {
    if (instance === null) {
      return new Cycle(singletonSymbol);
    }
    return instance;
  }
}
