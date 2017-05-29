/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/26 - 14:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/event
import EventDispatcher from '../moku/event/EventDispatcher';
import Events from '../moku/event/Events';

/**
 * singleton を保証するための inner Symbol
 * @private
 * @type {Symbol}
 */
const singletonSymbol = Symbol('Controller singleton instance');
/**
 * singleton instance
 * @private
 * @type {?Controller}
 */
let instance = null;

export default class Controller extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  static get NEXT() {
    return 'controllerNext';
  }
  static get PREV() {
    return 'controllerPrev';
  }
  static get JUMP() {
    return 'controllerJump';
  }
  static get BEGIN() {
    return 'controllerBegin';
  }
  static get COMPLETE() {
    return 'controllerComplete';
  }
  static get PAUSE() {
    return 'controllerPause';
  }
  static get RESUME() {
    return 'controllerResume';
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * Controller instance を singleton を保証し作成します
   * @returns {Controller} Cycle instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new Controller(singletonSymbol);
    }
    return instance;
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
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
    const jumpEvents = new Events(Controller.JUMP, this, this);
    jumpEvents.index = -1;
    this.jumpEvents = jumpEvents;
    this.nextEvents = new Events(Controller.NEXT, this, this);
    this.prevEvents = new Events(Controller.PREV, this, this);
    this.beginEvents = new Events(Controller.BEGIN, this, this);
    this.completeEvents = new Events(Controller.COMPLETE, this, this);
    this.pauseEvents = new Events(Controller.PAUSE, this, this);
    this.resumeEvents = new Events(Controller.RESUME, this, this);
    this.moving = false;
    this.index = -1;
    this.timer = 0;
    return this;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  // prev / next / jump
  // ----------------------------------------
  /**
   * next button click - Controller.NEXT 発火
   */
  next() {
    if (this.moving) {
      return;
    }
    console.log('Controller.next', this.nextEvents);
    this.dispatch(this.nextEvents);
  }
  /**
   * prev button click - Controller.PREV 発火
   */
  prev() {
    if (this.moving) {
      return;
    }
    this.dispatch(this.prevEvents);
  }
  /**
   * pager or next|prev post - Controller.JUMP 発火
   * @param {number} slideIndex 移動するスライド番号
   */
  jump(slideIndex) {
    const index = parseInt(slideIndex, 10);
    // if (this.moving) {
    //   return;
    // }
    // 同じ時は処理しない
    if (this.index === index) {
      return;
    }
    this.index = index;
    const jumpEvents = this.jumpEvents;
    jumpEvents.index = index;
    // fire
    this.dispatch(jumpEvents);
  }
  // motion - begin / complete
  // ----------------------------------------
  /**
   * CSS animation 開始を通知します
   */
  begin() {
    clearTimeout(this.timer);
    this.moving = true;
    this.dispatch(this.beginEvents);
  }
  /**
   * CSS animation complete を通知します
   */
  complete() {
    this.dispatch(this.completeEvents);
    this.moving = false;
  }
  /**
   * 遅延し `complete` を実行します
   * @param {number} [delay=0] 遅延時間
   */
  delayComplete(delay = 0) {
    this.timer = setTimeout(() => {
      this.complete();
    }, delay * 1000);
  }
  // when dragging - pause polling
  // ----------------------------------------
  /**
   * polling pause を通知します
   */
  pause() {
    this.dispatch(this.pauseEvents);
  }
  /**
   * polling resume を通知します
   */
  resume() {
    this.dispatch(this.resumeEvents);
  }
}
