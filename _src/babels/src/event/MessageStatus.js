/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/24 - 14:31
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
 * flush message
 */
export class MessageStatus extends EventDispatcher {
  /**
   * <h3>flush message</h3>
   * <p>完了・注意など一時表示メッセージイベント</p>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {*}
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `MessageStatus is static Class. not use new MessageStatus(). instead MessageStatus.factory()` );

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
   * FLUSH message のみ
   * @return {string} messageFlush を返します
   */
  static get FLUSH():string {
    return 'messageFlush';
  }
  /**
   * CONFIRM confirm window
   * @return {string} messageConfirm を返します
   */
  static get CONFIRM():string {
    return 'messageConfirm';
  }
  /**
   * ALERT alert window
   * @return {string} messageAlert を返します
   */
  static get ALERT():string {
    return 'messageAlert';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * flush message event を発火します
   * @param {string} message 表示文字列
   */
  flush( message:string ):void {
    this.dispatch( {type: MessageStatus.FLUSH, message: message} );
  }
  /**
   * confirm window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   */
  alert( message:string, ok:Function, cancel:Function ):void {
    this.dispatch( {type: MessageStatus.ALERT, message: message, ok: ok, cancel: cancel} );
  }
  /**
   * alert window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   */
  confirm( message:string, ok:Function, cancel:Function ):void {
    this.dispatch( {type: MessageStatus.CONFIRM, message: message, ok: ok, cancel: cancel} );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {MessageStatus} MessageStatus instance を返します
   */
  static factory():MessageStatus {

    if ( _instance === null ) {

      _instance = new MessageStatus( _symbol );

    }

    return _instance;
  }
}
