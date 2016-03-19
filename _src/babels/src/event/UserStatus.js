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
'use strict';

import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * ログイン / ログアウト を通知
 *
 * @example
 * var userStatus = UserStatus.factory();
 *
 *  */
export class UserStatus extends EventDispatcher {
  /**
   * ログイン / ログアウト を通知する SingleTon
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {UserStatus} UserStatus インスタンスを返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `UserStatus is static Class. not use new UserStatus().` );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  method
  // ---------------------------------------------------
  /**
   * UserStatus.LOG_IN event を fire します
   */
  login():void {
    this.dispatch( { type: UserStatus.LOG_IN, sign: true } );
  }
  /**
   * UserStatus.LOG_OUT event を fire します
   */
  logout():void {
    this.dispatch( { type: UserStatus.LOG_OUT, sign: false } );
  }
  // ---------------------------------------------------
  //  static const
  // ---------------------------------------------------
  /**
   * LOG_IN event
   * @return {string} LOG_IN event type を返します
   */
  static get LOG_IN():string {
    return 'logIn';
  }
  /**
   * LOG_OUT event
   * @return {string} LOG_OUT event type を返します
   */
  static get LOG_OUT():string {
    return 'logOut';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {UserStatus} UserStatus instance を返します
   */
  static factory():UserStatus {

    if ( _instance === null ) {

      _instance = new UserStatus( _symbol );

    }

    return _instance;
  }
}
