/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 22:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// import { default as EventDispatcher } from '../EventDispatcher';
// import { default as Events } from '../Events';

// moku/event
import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';


/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('RefreshEvent singleton symbol');
/**
 * singleton instance, nullable
 * @type {?RefreshEvent}
 * @private
 */
let instance = null;

/**
 * 日本シリーズ速報, refresh 関係イベントマネージャー
 */
export default class RefreshEvent extends EventDispatcher {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * RefreshEvent instance を singleton を保証し作成します
   * @return {RefreshEvent} RefreshEvent instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new RefreshEvent(singletonSymbol);
    }
    return instance;
  }
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {?RefreshEvent} singleton instance を返します
   */
  constructor(checkSymbol) {
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    if (instance !== null) {
      return instance;
    }
    super();
    // ----
    // instance = this;
    // return instance;
    return this;
  }
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * auto / manual 切替時に発生するイベントです
   * @event DRIVE
   * @return {string} refreshEventDrive
   */
  static get DRIVE() {
    return 'refreshEventDrive';
  }
  /**
   * refresh button が押された時に発生するイベントです
   * @event REFRESH
   * @return {string} refreshEventRefresh
   */
  static get REFRESH() {
    return 'refreshEventRefresh';
  }
  /**
   * 日本シリーズ速報 JSON 取得時に発生するイベントです
   * @event LOAD
   * @return {string} refreshEventLoad
   */
  static get LOAD() {
    return 'refreshEventLoad';
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * RefreshEvent.DRIVE event を発火します
   * @param {string} kind auto / manual
   */
  drive(kind) {
    const events = new Events(RefreshEvent.DRIVE, this, this);
    events.kind = kind;
    // console.log('drive', events);
    this.dispatch(events);
  }
  /**
   * RefreshEvent.REFRESH event を発火します
   */
  refresh() {
    const events = new Events(RefreshEvent.REFRESH, this, this);
    this.dispatch(events);
  }
  /**
   * RefreshEvent.LOAD event を発火します
   */
  load() {
    const events = new Events(RefreshEvent.LOAD, this, this);
    this.dispatch(events);
  }
}
