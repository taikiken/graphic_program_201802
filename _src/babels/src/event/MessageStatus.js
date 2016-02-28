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
  /**
   * comment delete confirm
   * @return {string} messageDelete を返します
   */
  static get DELETE():string {
    return 'messageDelete';
  }
  static get OK_CLICK():string {
    return 'messageOkClick';
  }
  static get CANCEL_CLICK():string {
    return 'messageCancelClick';
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * メッセージ種類 INFO
   * @return {string} info
   */
  static get INFO():string {
    return 'info';
  }
  /**
   * メッセージ種類 ERROR
   * @return {string} error
   */
  static get ERROR():string {
    return 'error';
  }
  /**
   * メッセージ種類 SUCCESS
   * @return {string} success
   */
  static get SUCCESS():string {
    return 'success';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * flush message event を発火します
   * @param {string} message 表示文字列
   * @param {Function} [ok=null] after callback method
   * @param {string} [type=info] after callback method
   */
  flush( message:string, ok:Function = null, type:string = MessageStatus.INFO ):void {
    this.dispatch( {type: MessageStatus.FLUSH, message: message, ok: ok, kind: type} );
  }
  /**
   * confirm window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   * @param {string} [type=info] after callback method
   */
  alert( message:string, ok:Function, cancel:Function, type:string = MessageStatus.INFO ):void {
    this.dispatch( {type: MessageStatus.ALERT, message: message, ok: ok, cancel: cancel, kind: type} );
  }
  /**
   * alert window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   * @param {string} [type=info] after callback method
   */
  confirm( message:string, ok:Function, cancel:Function, type:string = MessageStatus.INFO ):void {
    this.dispatch( {type: MessageStatus.CONFIRM, message: message, ok: ok, cancel: cancel, kind: type} );
  }

  remove( id:string, ok:Function, cancel:Function, type:string = MessageStatus.INFO ):void {
    if ( !ok ) {
      ok = function() {};
    }
    if ( !cancel ) {
      cancel = function() {};
    }
    this.dispatch( {type: MessageStatus.DELETE, id: id, ok: ok, cancel: cancel, kind: type} );
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
