/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 23:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * 設定
 * ユーザー情報更新の custom Event
 * - ACCOUNT_COMPLETE
 * - ACCOUNT_ERROR
 * - INTEREST_COMPLETE
 * - INTEREST_ERROR
 * @example
 * var settingsStatus = SettingsStatus.factory();
 */
export class SettingsStatus extends EventDispatcher {
  /**
   * 設定
   * ユーザー情報更新の custom Event
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {ReplyStatus} ReplyStatus instance を返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SettingsStatus is static Class. not use new SettingsStatus(). instead SettingsStatus.factory()' );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * ACCOUNT_COMPLETE
   * @return {string} settingsAccountComplete
   */
  static get ACCOUNT_COMPLETE():string {
    return 'settingsAccountComplete';
  }
  /**
   * ACCOUNT_ERROR
   * @return {string} settingsAccountError
   */
  static get ACCOUNT_ERROR():string {
    return 'settingsAccountError';
  }
  /**
   * INTEREST_COMPLETE
   * @return {string} settingsInterestComplete
   */
  static get INTEREST_COMPLETE():string {
    return 'settingsInterestComplete';
  }
  /**
   * INTEREST_ERROR
   * @return {string} settingsInterestError
   */
  static get INTEREST_ERROR():string {
    return 'settingsInterestError';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SettingsStatus} SettingsStatus instance を返します
   */
  static factory():SettingsStatus {

    if ( _instance === null ) {

      _instance = new SettingsStatus( _symbol );

    }

    return _instance;
  }
}
