/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/07 - 20:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Scroll } from '../util/Scroll';

// event
import { EventDispatcher } from '../event/EventDispatcher';
// import { default as Events } from '../event/Events';

// tick
import Rate from './Rate';

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('Scrolling singleton symbol');
/**
 * singleton instance, nullable
 * @type {?Scrolling}
 * @private
 */
let instance = null;
// /**
//  * private property key, bind 済み mouseWheel を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const bindSymbol = Symbol('bound mouseWheel');
// /**
//  * Cycle.UPDATE event を発火する時の Events instance を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const eventsSymbol = Symbol('Cycle.UPDATE event');
// /**
//  * scroll top 位置が変更になったかを確認するために前回値を保存するための Symbol
//  * @type {Symbol}
//  */
// const topSymbol = Symbol('previous scroll top');

/**
 * 引数 rate instance に設定した fps でスクロール位置を通知します
 * - singleton なので new ではなく factory を使用し instance を作成します
 *
 * ```
 * const instance = Scrolling.factory();
 * instance.mother = new Elements(Elements.id(js-tc_scanimation-motion))
 * ```
 *
 * @since 2016-11-16
 * */
export default class Scrolling extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * fps で発生するイベントを取得します
   * @event UPDATE
   * @return {string} event, scrollingUpdate を返します
   * @default scrollingUpdate
   */
  static get UPDATE() {
    return 'scrollingUpdate';
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Scrolling instance を singleton を保証し作成します
   * @return {Scrolling} Scrolling instance を返します
   */
  static factory() {
    if (!instance) {
      instance = new Scrolling(singletonSymbol);
    }
    return instance;
    // return new Scrolling(singletonSymbol);
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {Scrolling} singleton instance を返します
   */
  constructor(checkSymbol) {
    // console.log('Scrolling', checkSymbol, singletonSymbol, instance);
    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      return instance;
    }
    // console.log('Scrolling ------[super]------');
    // ---
    super();

    // onetime setting
    // instance = this;

    // // @type {function} - bound scroll function
    // this[bindSymbol] = this.scroll.bind(this);
    //
    // // @type {Events} - events instance
    // // this[eventsSymbol] = new Events(Scrolling.SCROLL, this, this);
    // this[eventsSymbol] = {
    //   type: Scrolling.UPDATE,
    //   target: this,
    //   currentTarget: this
    // };
    //
    // // @type {number} - scroll top 前回値を保存します
    // // @default -1
    // this[topSymbol] = -1;

    // /**
    //  * @property {Rate} this.rate - Rate instance
    //  */
    // Object.assign(this, { rate });
    /**
     * Rate instance
     * @type {?Rate}
     */
    this.rate = null;
    /**
     * watch 済みフラッグ
     * @type {boolean}
     * @default false
     */
    this.started = false;
    /**
     * bind scroll - scroll event handler
     * @type {any}
     */
    this.bindScroll = this.scroll.bind(this);
    /**
     * {@link Scrolling}.UPDATE event object
     * @type {{type: string, target: Scrolling, currentTarget: Scrolling}}
     */
    this.events = {
      type: Scrolling.UPDATE,
      target: this,
      currentTarget: this,
    };
    /**
     * scroll top 前回値
     * @type {number}
     * @default -1
     */
    this.prevY = -1;

    // 設定済み instance を返します
    return this;
  }

  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  // /**
  //  * bind 済み mouseWheel
  //  * @return {function} bind 済み mouseWheel を返します
  //  */
  // get bindScroll() {
  //   return this[bindSymbol];
  // }
  // events
  // /**
  // //  * Events instance を取得します
  // //  * @return {Events} Events instance
  // //  */
  // get events() {
  //   return this[eventsSymbol];
  // }
  // /**
  //  * Events instance を設定します
  //  * @param {Events} events Events instance
  //  */
  // set events(events) {
  //   this[eventsSymbol] = events;
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * fps を監視しスクロール位置を知らせます
   * - Rate.UPDATE watch
   * @return {Scrolling} method chain 可能なように instance を返します
   */
  start() {
    if (this.started) {
      return this;
    }
    const rate = this.rate;
    if (rate === null) {
      throw new Error(`Set Rate instance, before watch. rate: ${rate}`);
    }
    this.started = true;
    rate.on(Rate.UPDATE, this.bindScroll);
    rate.start();

    return this;
  }
  /**
   * fps 監視を止めます
   * @return {Scrolling} method chain 可能なように instance を返します
   */
  stop() {
    if (!this.started) {
      return this;
    }
    const rate = this.rate;
    if (rate === null) {
      throw new Error(`Set Rate instance, before unwatch. rate: ${rate}`);
    }
    rate.off(Rate.UPDATE, this.bindScroll);
    this.started = false;
    return this;
  }
  /**
   * window scroll event handler<br>
   * window scroll event 発生後に scroll top 位置をもたせた Scroll.SCROLL custom event を発火します
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
   * @param {?Event|?Events} event window scroll event, nullable
   * @return {undefined} no-return
   */
  scroll(event) {
    // @type {number} - scroll top
    const y = Scroll.y;
    // @type {number} - window height
    const height = window.innerHeight;
    // @type {number} - window width
    const width = window.innerWidth;
    // @type {number} - previous scroll top
    // const previous = this[topSymbol];
    const previous = this.prevY;

    // @type {Events} - events
    const events = this.events;

    // @type {Event} - Rate Events instance
    events.original = event;
    // @type {number} - scroll top
    events.y = y;
    // @type {number} - window height
    events.height = height;
    // @type {number} - window width
    events.width = width;
    // // @type {boolean} - window width が 768px 以上かを表す真偽値
    // events.wide = width >= 768;
    // @type {number} - window bottom(y + height)
    events.bottom = y + height;
    // @type {boolean} - 移動したかを表します,
    // event が null の時は強制発火なので移動量 0 （scroll top 位置に変更がない）でも changed を true にします
    events.changed = event === null || previous !== y;
    // @type {number} - 前回の y 位置
    events.previous = previous;
    // // @type {number} - 移動量 +: down, -: up
    // events.moving = y - previous;
    // Scroll.onScroll にならい -方向が scroll down として使用します
    events.moving = previous - y;
    // event fire
    // console.log('Scrolling.scroll', events);
    this.dispatch(events);

    // save scroll top -> previous
    // this[topSymbol] = y;
    this.prevY = y;
  }
  /**
   * 強制的に Scrolling.SCROLL event を発火させます
   */
  fire() {
    this.scroll(null);
  }
}
