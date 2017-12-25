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
  /**
   * <h3>Singleton</h3>
   * <p>Logout modal 用 custom Event</p>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {LogoutStatus} LogoutStatus instance を返します
   */
  constructor( target ) {
    if ( logoutStatusSymbol !== target ) {

      throw new Error( 'LogoutStatus is static Class. not use new LogoutStatus(). instead LogoutStatus.factory()' );

    }

    if ( singletonInstance === null ) {
      super();
      singletonInstance = this;
    }

    return singletonInstance;
  }

  /**
   * OPEN event kick
   * @param {Function} [ok=null] ok / yes callback
   * @param {Function} [cancel=null] cancel callback
   */
  open( ok:Function = null, cancel:Function = null ):void {
    this.dispatch( { type: LogoutStatus.OPEN, ok: ok, cancel: cancel } );
  }
  /**
   * CLOSE event kick
   */
  close():void {
    this.dispatch( { type: LogoutStatus.CLOSE } );
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * OPEN
   * @return {string} logoutOpen を返します
   */
  static get OPEN():string {
    return 'logoutOpen';
  }
  /**
   * CLOSE
   * @return {string} logoutClose を返します
   */
  static get CLOSE():string {
    return 'logoutClose';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {LogoutStatus} LogoutStatus instance を返します
   */
  static factory():LogoutStatus {

    if ( singletonInstance === null ) {

      singletonInstance = new LogoutStatus( logoutStatusSymbol );

    }

    return singletonInstance;
  }
}
