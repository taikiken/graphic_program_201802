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

const singletonSymbol = Symbol('Controller singleton instance');
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
  static get START() {
    return 'controllerStart';
  }
  static get COMPLETE() {
    return 'controllerComplete';
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
    this.startEvents = new Events(Controller.START, this, this);
    this.completeEvents = new Events(Controller.COMPLETE, this, this);
    this.moving = false;
    this.index = -1;
    return this;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  next() {
    if (this.moving) {
      return;
    }
    this.dispatch(this.nextEvents);
  }
  prev() {
    if (this.moving) {
      return;
    }
    this.dispatch(this.prevEvents);
  }
  jump(slideIndex) {
    const index = parseInt(slideIndex, 10);
    if (this.moving) {
      return;
    }
    if (this.index === index) {
      return;
    }
    this.index = index;
    const jumpEvents = this.jumpEvents;
    jumpEvents.index = index;
    this.dispatch(jumpEvents);
  }
  start() {
    this.moving = true;
    this.dispatch(this.startEvents);
  }
  complete() {
    this.dispatch(this.completeEvents);
    this.moving = false;
  }
}
