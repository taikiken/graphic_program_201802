/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/02 - 20:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {EventDispatcher} from './EventDispatcher';

// Singleton を保証するための Symbol
/**
 * {@link UserStatus} inner symbol
 * @type {symbol}
 */
const userStatusSymbol = Symbol('UserStatus singleton Symbol');
// Singleton instance
/**
 * {@link UserStatus} singleton instance
 * @type {?UserStatus}
 */
let singletonInstance = null;

/**
 * ログイン / ログアウト を通知
 *
 * Singleton class です `new` 演算子での instance 作成はできません
 *
 * @example
 * const userStatus = UserStatus.factory();
 *
 *  */
export class UserStatus extends EventDispatcher {
  /**
   * ログイン / ログアウト を通知する SingleTon
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {UserStatus} UserStatus インスタンスを返します
   */
  constructor(target) {
    if (userStatusSymbol !== target) {
      throw new Error('UserStatus is static Class. not use new UserStatus().');
    }
    if (singletonInstance !== null) {
      return singletonInstance;
    }
    // ------
    // do once
    super();
    singletonInstance = this;

    return singletonInstance;
  }
  // ---------------------------------------------------
  //  method
  // ---------------------------------------------------
  /**
   * UserStatus.LOG_IN event を fire します
   */
  login() {
    this.dispatch({ type: UserStatus.LOG_IN, sign: true });
  }
  /**
   * UserStatus.LOG_OUT event を fire します
   */
  logout() {
    this.dispatch({ type: UserStatus.LOG_OUT, sign: false });
  }
  // ---------------------------------------------------
  //  static const
  // ---------------------------------------------------
  /**
   * LOG_IN event
   * @event LOG_IN
   * @return {string} LOG_IN event type を返します
   */
  static get LOG_IN() {
    return 'logIn';
  }
  /**
   * LOG_OUT event
   * @event LOG_OUT
   * @return {string} LOG_OUT event type を返します
   */
  static get LOG_OUT() {
    return 'logOut';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {UserStatus} UserStatus instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new UserStatus( userStatusSymbol );
    }
    return singletonInstance;
  }
}
