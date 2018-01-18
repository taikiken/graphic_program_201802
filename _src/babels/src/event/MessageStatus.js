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
/* eslint constructor-super: 0 */

import {EventDispatcher} from './EventDispatcher';

/**
 * {@link MessageStatus} inner symbol
 * @type {symbol}
 */
const messageStatusSymbol = Symbol('MessageStatus symbol');
/**
 * {@link MessageStatus} singleton instance
 * @type {?MessageStatus}
 * @private
 */
let singletonInstance = null;

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */

/**
 * flush message
 * - 完了・注意など一時表示メッセージイベント
 */
export class MessageStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * FLUSH message のみ
   * @return {string} messageFlush を返します
   */
  static get FLUSH() {
    return 'messageFlush';
  }
  /**
   * CONFIRM confirm window
   * @return {string} messageConfirm を返します
   */
  static get CONFIRM() {
    return 'messageConfirm';
  }
  /**
   * ALERT alert window
   * @return {string} messageAlert を返します
   */
  static get ALERT() {
    return 'messageAlert';
  }
  /**
   * comment delete confirm
   * @return {string} messageDelete を返します
   */
  static get DELETE() {
    return 'messageDelete';
  }
  /**
   * OK_CLICK
   * @return {string} messageOkClick
   */
  static get OK_CLICK() {
    return 'messageOkClick';
  }
  /**
   * CANCEL_CLICK
   * @return {string} messageCancelClick
   */
  static get CANCEL_CLICK() {
    return 'messageCancelClick';
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * メッセージ種類 INFO
   * @return {string} info
   */
  static get INFO() {
    return 'info';
  }
  /**
   * メッセージ種類 ERROR
   * @return {string} error
   */
  static get ERROR() {
    return 'error';
  }
  /**
   * メッセージ種類 SUCCESS
   * @return {string} success
   */
  static get SUCCESS() {
    return 'success';
  }
  /**
   * Flush modal に表示するメッセージを作成します
   * @param {string} txt 表示テキスト
   * @return {XML} JSX を返します
   */
  static message(txt = '') {
    return (
      <div className="messageText">{txt}</div>
    );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {MessageStatus} MessageStatus instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new MessageStatus( messageStatusSymbol );
    }
    return singletonInstance;
  }
  /**
   * flush message
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {MessageStatus} MessageStatus instance を返します
   */
  constructor(target) {
    if (messageStatusSymbol !== target) {
      throw new Error('MessageStatus is static Class. not use new MessageStatus(). instead MessageStatus.factory()');
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
   * flush message event を発火します
   * @param {XML} message 表示 Element
   * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.FLUSH
   * @param {boolean} [sp=false] sp or PC | Tablet
   */
  flush(message, type = MessageStatus.INFO, sp = false) {
    this.dispatch({ type: MessageStatus.FLUSH, message, kind: type, sp: sp });
  }
  /**
   * confirm window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.INFO
   */
  alert(message, ok, cancel, type = MessageStatus.INFO) {
    this.dispatch( {type: MessageStatus.ALERT, message: message, ok: ok, cancel: cancel, kind: type} );
  }
  /**
   * alert window event を発火します
   * @param {string} message 表示文字列
   * @param {Function} ok ok click callback
   * @param {Function} cancel cancel click callback
   * @param {string} [type=info] flush message 種類 - {@link MessageStatus}.INFO
   */
  confirm(message, ok, cancel, type = MessageStatus.INFO) {
    this.dispatch({ type: MessageStatus.CONFIRM, message, ok, cancel, kind: type });
  }
  /**
   * 削除モーダル
   * @param {string} id unique id
   * @param {Function} [ok] ok callback
   * @param {Function} [cancel] cancel callback
   * @param {string} [type=MessageStatus.INFO] message type MessageStatus.INFO | MessageStatus.ERROR | MessageStatus.SUCCESS
   */
  remove(id, ok, cancel, type = MessageStatus.INFO) {
    if (!ok) {
      ok = function() {};
    }
    if (!cancel) {
      cancel = function() {};
    }
    this.dispatch({ type: MessageStatus.DELETE, id, ok, cancel, kind: type });
  }
}
