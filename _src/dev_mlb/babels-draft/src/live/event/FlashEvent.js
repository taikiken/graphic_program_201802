/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/09 - 16:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // event
// import { default as EventDispatcher } from '../EventDispatcher';
// import { default as Events } from '../Events';

import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';

/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('FlashEvent singleton symbol');
/**
 * singleton instance, nullable
 * @type {?FlashEvent}
 * @private
 */
let instance = null;

/**
 * singleton: 球団選択 select.onchange event を共有します
 */
export default class FlashEvent extends EventDispatcher {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * for SP - 球団変更イベント
   * @type {string}
   */
  static CHANGE = 'flashChange';
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * FlashEvent instance を singleton を保証し作成します
   * @return {FlashEvent} SPFlash instance を返します
   */
  static factory() {
    if (!instance) {
      instance = new FlashEvent(singletonSymbol);
    }
    return instance;
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * singleton, 球団選択 select.onchange event を共有します
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {FlashEvent} singleton instance を返します
   */
  constructor(checkSymbol) {
    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    super();
    // instance 作成済みかをチェックし instance が null の時 this を設定します
    if (instance !== null) {
      return instance;
    }

    // // onetime setting
    // instance = this;
    // // 設定済み instance を返します
    // return instance;
    return this;
  }
  // // ----------------------------------------
  // // EVENT
  // // ----------------------------------------
  // /**
  //  * mobile, 球団変更イベント
  //  * @event CHANGE
  //  * @return {string} flashSelectChange
  //  */
  // static get CHANGE() {
  //   return 'flashSelectChange';
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * select から change 時に選択 teamId を送られ、それを元に SPFlash.CHANGE event を発火します
   * @param {number} teamId チーム ID
   */
  change(teamId) {
    const events = new Events(FlashEvent.CHANGE, this, this);
    events.teamId = teamId;
    // 発火
    this.dispatch(events);
  }
}
