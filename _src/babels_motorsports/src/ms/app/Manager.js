/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/13 - 16:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('Manager singleton instance');
/**
 * singleton instance, nullable
 * @type {?Manager}
 * @private
 */
let instance = null;

/**
 * global な通知を監視します
 */
export default class Manager extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * tab を開いたことを通知します
   * @event TAB_OPEN
   * @returns {string} tab を開いた Event type - tabOpen
   */
  static get TAB_OPEN() {
    return 'tabOpen';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * Manager instance を singleton を保証し作成します
   * @returns {Manager} Manager instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new Manager(singletonSymbol);
    }
    return instance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * singleton
   * @param {Symbol} checkSymbol singleton 保証のためにしようします
   * @return {*} singleton instance を返します
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
    /**
     * 管理するイベントリスト
     * - rising - final 表示
     * - open - modal open
     * - close - modal close
     * @type {{rising: Events, open: Events, close: Events}}
     */
    this.events = {
      tab: new Events(Manager.TAB_OPEN, this, this),
    };
    // 設定済み instance を返します
    return this;
  }
  tab(id) {
    const events = this.events.tab;
    events.id = id;
    this.dispatch(events);
  }
}
