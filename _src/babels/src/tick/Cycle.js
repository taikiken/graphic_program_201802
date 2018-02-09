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
import { EventDispatcher } from '../event/EventDispatcher';
// import { Events } from '../event/Events';

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('Cycle singleton SYmbol');
/**
 * singleton instance, nullable
 * @type {?Cycle}
 * @private
 */
let instance = null;

// /**
//  * private property key, requestAnimationFrame ID を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const requestSymbol = Symbol('requestAnimationFrame ID');
// /**
//  * private property key, this.update.bind(this) を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const updateSymbol = Symbol('bound update');
// /**
//  * private property key, requestAnimationFrame を開始したかを表す真偽値を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const startSymbol = Symbol('has started requestAnimationFrame flag');
// /**
//  * Cycle.UPDATE event を発火する時の Events instance を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const eventsSymbol = Symbol('Cycle.UPDATE Events instance');

/**
 * requestAnimationFrame でループイベントを発生させます
 * - singleton なので new ではなく factory を使用し instance を作成します
 * - requestAnimationFrame は browser tab が active(focus) な時のみ発生します
 *
 * ```
 * const loop = Cycle.factory();
 * ```
 *
 * @since 2016-11-16
 */
export default class Cycle extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * requestAnimationFrame 毎に発生するイベントを取得します
   * @event UPDATE
   * @return {string} event, cycleUpdate を返します
   * @default cycleUpdate
   */
  static get UPDATE() {
    return 'cycleUpdate';
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Cycle instance を singleton を保証し作成します
   * @return {Cycle} Cycle instance を返します
   */
  static factory() {
    if (!instance) {
      instance = new Cycle(singletonSymbol);
    }
    return instance;
    // return new Cycle(singletonSymbol);
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {Cycle} singleton instance を返します
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
    // ----
    super();
    // onetime setting
    // instance = this;
    // // @type {Events} - Events
    // // this[eventsSymbol] = new Events(Cycle.UPDATE, this, this);
    // this[eventsSymbol] = {
    //   type: Cycle.UPDATE,
    //   target: this,
    //   currentTarget: this
    // };
    //
    // // @type {number} - requestAnimationFrame return id
    // this[requestSymbol] = 0;
    // // @type {function} - update bind function
    // this[updateSymbol] = this.update.bind(this);
    // // @type {boolean} - started flag
    // this[startSymbol] = false;
    /**
     * Cycle.UPDATE event を発火する時の Event object - {@link Cycle}.UPDATE
     * @type {{type: string, target: Cycle, currentTarget: Cycle}}
     */
    this.events = {
      type: Cycle.UPDATE,
      target: this,
      currentTarget: this,
    };
    /**
     * requestAnimationFrame ID
     * @type {number}
     * @default 0
     */
    this.animationId = 0;
    /**
     * requestAnimationFrame を開始したかを表す真偽値
     * @type {boolean}
     * @default false;
     */
    this.started = false;
    /**
     * bind onUpdate - `requestAnimationFrame` 実行します
     * @type {function}
     */
    this.onUpdate = this.onUpdate.bind(this);

    // 設定済み instance を返します
    return this;
  }
  // // ----------------------------------------
  // // GETTER / SETTER
  // // ----------------------------------------
  // /**
  //  * Events instance を取得します
  //  * @return {Object} Events instance
  //  */
  // get events() {
  //   return this[eventsSymbol];
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * loop(requestAnimationFrame) を開始します
   * @return {boolean} start に成功すると true を返します
   */
  start() {
    // if (this[startSymbol]) {
    if (this.started) {
      // already start
      // console.warn('Cycle.start already start', this[startSymbol]);
      return false;
    }
    // this[startSymbol] = true;
    this.started = true;
    // this.update();
    this.onUpdate();

    // @return
    return true;
  }
  /**
   * loop を止めます `cancelAnimationFrame` を実行します - 全ての `loop` を止めます
   * @param {number} [id=this.animationId] requestAnimationFrame id を使い cancelAnimationFrame をします
   * @return {boolean} stop に成功すると true を返します
   */
  stop(id = this.animationId) {
  // stop(id = this[requestSymbol]) {
    if (!this.started) {
    // if (!this[startSymbol]) {
      // not start
      return false;
    }

    cancelAnimationFrame(id);
    // this[startSymbol] = false;
    this.started = false;

    // @return
    return true;
  }
  // ----------------------------------------
  // PRIVATE METHOD
  // ----------------------------------------
  /**
   * loop(requestAnimationFrame)コールバック関数<br>Cycle.UPDATE event を発火します
     */
  onUpdate() {
  // update() {
    // @type {number} - requestAnimationFrame id
    const id = requestAnimationFrame(this.onUpdate);
    // const id = requestAnimationFrame(this[updateSymbol]);
    this.animationId = id;
    // this[requestSymbol] = id;

    // @type {Object} - events
    const events = this.events;
    events.id = id;
    // event fire
    this.dispatch(events);
  }
}
