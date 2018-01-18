/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/08 - 21:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint constructor-super: 0 */

import {EventDispatcher} from './EventDispatcher';

/**
 * {@link LogoutStatus} inner symbol
 * @type {symbol}
 */
const logoutStatusSymbol = Symbol('LogoutStatus symbol');
/**
 * {@link LogoutStatus} singleton instance
 * @type {?LogoutStatus}
 */
let singletonInstance = null;

/**
 * Logout modal を open / close するための custom Event
 */
export class LogoutStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * OPEN
   * @return {string} logoutOpen を返します
   */
  static get OPEN() {
    return 'logoutOpen';
  }
  /**
   * CLOSE
   * @return {string} logoutClose を返します
   */
  static get CLOSE() {
    return 'logoutClose';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {LogoutStatus} LogoutStatus instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new LogoutStatus(logoutStatusSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * Logout modal 用 custom Event
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {LogoutStatus} LogoutStatus instance を返します
   */
  constructor(target) {
    if (logoutStatusSymbol !== target) {
      throw new Error( 'LogoutStatus is static Class. not use new LogoutStatus(). instead LogoutStatus.factory()' );
    }
    if (singletonInstance === null) {
      super();
      singletonInstance = this;
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * OPEN event kick
   * @param {Function} [ok=null] ok / yes callback
   * @param {Function} [cancel=null] cancel callback
   */
  open(ok = null, cancel = null) {
    this.dispatch({ type: LogoutStatus.OPEN, ok, cancel });
  }
  /**
   * CLOSE event kick
   */
  close() {
    this.dispatch({ type: LogoutStatus.CLOSE });
  }
}
