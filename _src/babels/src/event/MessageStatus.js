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


import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * flush message
 * <p>完了・注意など一時表示メッセージイベント</p>
 */
export class MessageStatus extends EventDispatcher {
  /**
   * <h3>flush message</h3>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {*} MessageStatus instance を返します
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
  /**
   * OK_CLICK
   * @return {string} messageOkClick
   */
  static get OK_CLICK():string {
    return 'messageOkClick';
  }
  /**
   * CANCEL_CLICK
   * @return {string} messageCancelClick
   */
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
  /**
   * Flush modal に表示するメッセージを作成します
   * @param {string} txt 表示テキスト
   * @return {XML} JSX を返します
   */
  static message( txt:string = '' ) {
    return (
      <div className="messageText">{txt}</div>
    );
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * flush message event を発火します
   * @param {XML} message 表示 Element
   * @param {string} [type=info] flush message 種類
   * @param {Boolean} [sp=false] sp or PC | Tablet
   */
  flush( message, type:string = MessageStatus.INFO, sp:Boolean = false ):void {
    this.dispatch( {type: MessageStatus.FLUSH, message: message, kind: type, sp: sp} );
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
  /**
   * 削除モーダル
   * @param {string} id unique id
   * @param {Function} [ok] ok callback
   * @param {Function} [cancel] cancel callback
   * @param {string} [type=MessageStatus.INFO] message type MessageStatus.INFO | MessageStatus.ERROR | MessageStatus.SUCCESS
   */
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
